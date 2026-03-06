/* ============================================
   ASSESSMENT CORE ENGINE — Shared Logic
   Used by both assessment.js (EN) and assessment-es.js (ES)
   ============================================ */

/**
 * Initialize the assessment engine with locale-specific config.
 * @param {Object} config
 * @param {Array}  config.sections       — section definitions with names, questions, recommendations
 * @param {Object} config.tiers          — tier thresholds with names, descriptions, CTAs
 * @param {Object} config.labels         — UI labels (questionOf, detailedBreakdown, whatsNext, ratingLabels, progressPrefix, shareUrl, radarLabel)
 */
function initAssessmentEngine(config) {
    const TOTAL_QUESTIONS = 10;
    const MAX_SCORE = 50;
    const answers = {};
    let currentStep = 0;

    const { sections, tiers, labels } = config;

    // Start button
    document.getElementById('start-assessment').addEventListener('click', () => {
        goToStep(1);
    });

    // Option selection — auto-advance after a short delay
    document.querySelectorAll('.assessment__option').forEach(btn => {
        btn.addEventListener('click', function () {
            const optionsContainer = this.closest('.assessment__options');
            const qNum = parseInt(optionsContainer.dataset.question);
            const value = parseInt(this.dataset.value);

            optionsContainer.querySelectorAll('.assessment__option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            answers[qNum] = value;

            setTimeout(() => {
                if (currentStep < TOTAL_QUESTIONS) {
                    goToStep(currentStep + 1);
                } else {
                    showGate();
                }
            }, 400);
        });
    });

    // Keyboard navigation (1-5 keys)
    document.addEventListener('keydown', (e) => {
        if (currentStep < 1 || currentStep > TOTAL_QUESTIONS) return;
        const key = parseInt(e.key);
        if (key >= 1 && key <= 5) {
            const step = document.getElementById('step-' + currentStep);
            if (!step || step.style.display === 'none') return;
            const option = step.querySelector(`.assessment__option[data-value="${key}"]`);
            if (option) option.click();
        }
    });

    // Gate form submission
    document.getElementById('gate-form').addEventListener('submit', function (e) {
        e.preventDefault();
        submitAndShowResults();
    });

    function goToStep(stepNum) {
        hideAll();
        currentStep = stepNum;

        const progressWrap = document.getElementById('assessment-progress');
        progressWrap.style.display = '';

        const answeredCount = Object.keys(answers).length;
        const pct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
        document.getElementById('progress-fill').style.width = pct + '%';
        document.getElementById('progress-section').textContent =
            `${labels.progressPrefix || 'Question'} ${stepNum} ${labels.progressOf || 'of'} ${TOTAL_QUESTIONS}`;
        document.getElementById('progress-percent').textContent = pct + '%';

        const step = document.getElementById('step-' + stepNum);
        if (step) {
            step.style.display = '';
            requestAnimationFrame(() => {
                step.classList.add('assessment__fade-in');
            });

            const optionsContainer = step.querySelector('.assessment__options');
            const qNum = parseInt(optionsContainer.dataset.question);
            if (answers[qNum] !== undefined) {
                optionsContainer.querySelectorAll('.assessment__option').forEach(o => {
                    if (parseInt(o.dataset.value) === answers[qNum]) {
                        o.classList.add('selected');
                    }
                });
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showGate() {
        hideAll();
        currentStep = TOTAL_QUESTIONS + 1;
        document.getElementById('assessment-progress').style.display = 'none';

        const scores = calculateScores();
        document.getElementById('gate-score').value = scores.total;
        document.getElementById('gate-tier').value = scores.tier.name;
        document.getElementById('gate-section-scores').value = JSON.stringify(scores.sectionScores);
        document.getElementById('gate-answers').value = JSON.stringify(answers);

        const gate = document.getElementById('assessment-gate');
        gate.style.display = '';
        requestAnimationFrame(() => gate.classList.add('assessment__fade-in'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function submitAndShowResults() {
        const formData = new FormData(document.getElementById('gate-form'));
        const formAction = document.getElementById('gate-form').getAttribute('action');

        if (formAction && formAction !== '#') {
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).catch(() => { });
        }

        showResults();
    }

    function calculateScores() {
        let total = 0;
        const sectionScores = sections.map(sec => {
            const score = sec.questions.reduce((sum, q) => sum + (answers[q] || 1), 0);
            total += score;

            let rating;
            if (score >= 8) rating = 'strong';
            else if (score >= 6) rating = 'moderate';
            else if (score >= 4) rating = 'weak';
            else rating = 'critical';

            return { name: sec.name, score, maxScore: sec.maxScore, rating, recommendation: sec.recommendations[rating] };
        });

        let tier;
        if (total >= 40) {
            tier = tiers.auditReady;
        } else if (total >= 30) {
            tier = tiers.approachingReady;
        } else if (total >= 20) {
            tier = tiers.significantGaps;
        } else {
            tier = tiers.notReady;
        }

        return { total, maxScore: MAX_SCORE, sectionScores, tier };
    }

    function showResults() {
        hideAll();
        currentStep = TOTAL_QUESTIONS + 2;
        document.getElementById('assessment-progress').style.display = 'none';

        const results = document.getElementById('assessment-results');
        results.style.display = '';
        requestAnimationFrame(() => results.classList.add('assessment__fade-in'));

        const scores = calculateScores();

        // --- Animated score ring ---
        const scoreRing = document.getElementById('score-ring');
        const scoreNumber = document.getElementById('score-number');
        const circumference = 2 * Math.PI * 88;

        scoreRing.style.stroke = scores.tier.color;

        const duration = 1500;
        const startTime = performance.now();

        function animateScore(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            scoreNumber.textContent = Math.round(eased * scores.total);

            const offset = circumference - (eased * scores.total / scores.maxScore) * circumference;
            scoreRing.setAttribute('stroke-dashoffset', offset);

            if (progress < 1) requestAnimationFrame(animateScore);
        }
        requestAnimationFrame(animateScore);

        // --- Tier badge ---
        document.getElementById('results-tier').innerHTML = `
            <span class="results__tier-badge" style="background:${scores.tier.colorLight}; color:${scores.tier.color}; border: 1px solid ${scores.tier.color};">
                <span class="results__tier-icon">${scores.tier.icon}</span> ${scores.tier.name}
            </span>`;
        document.getElementById('results-tier-desc').textContent = scores.tier.description;

        // --- Section breakdown ---
        const ratingColors = { strong: '#22c55e', moderate: '#eab308', weak: '#f97316', critical: '#ef4444' };
        const ratingLabels = labels.ratingLabels || { strong: 'Strong', moderate: 'Moderate', weak: 'Weak', critical: 'Critical' };
        const breakdownTitle = labels.detailedBreakdown || 'Detailed Breakdown';

        document.getElementById('results-breakdown').innerHTML = `<h3>${breakdownTitle}</h3>` +
            scores.sectionScores.map(sec => {
                const pct = (sec.score / sec.maxScore) * 100;
                const color = ratingColors[sec.rating];
                const label = ratingLabels[sec.rating];
                return `
                <div class="results__section-item">
                    <div class="results__section-header">
                        <span class="results__section-name">${sec.name}</span>
                        <span class="results__section-score" style="color:${color}">${sec.score}/${sec.maxScore}</span>
                    </div>
                    <div class="results__section-bar">
                        <div class="results__section-fill" style="width:${pct}%; background:${color};"></div>
                    </div>
                    <div class="results__section-meta">
                        <span class="results__section-rating" style="color:${color}">${label}</span>
                        <p class="results__section-rec">${sec.recommendation}</p>
                    </div>
                </div>`;
            }).join('');

        // --- Radar chart ---
        renderRadarChart(scores);

        // --- Tier-specific CTA ---
        const whatsNext = labels.whatsNext || "What's Next?";
        document.getElementById('results-cta').innerHTML = `
            <div class="results__cta-box" style="border-color:${scores.tier.color};">
                <h3>${whatsNext}</h3>
                <p>${scores.tier.cta.text}</p>
                <a href="${scores.tier.cta.buttonLink}" class="btn btn--primary btn--lg">${scores.tier.cta.buttonText} <span class="btn__arrow">→</span></a>
            </div>`;

        // --- LinkedIn share ---
        const shareLink = document.getElementById('share-linkedin');
        if (shareLink && labels.shareUrl) {
            shareLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(labels.shareUrl)}`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderRadarChart(scores) {
        const ctx = document.getElementById('radar-chart');
        if (!ctx) return;
        if (typeof Chart === 'undefined') {
            setTimeout(() => renderRadarChart(scores), 200);
            return;
        }

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: scores.sectionScores.map(s => s.name),
                datasets: [{
                    label: labels.radarLabel || 'Your Score',
                    data: scores.sectionScores.map(s => s.score),
                    fill: true,
                    backgroundColor: 'rgba(201, 168, 76, 0.15)',
                    borderColor: '#C9A84C',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#C9A84C',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            color: '#5A6374',
                            backdropColor: 'transparent',
                            font: { size: 11, family: "'Inter', sans-serif" }
                        },
                        grid: { color: 'rgba(11, 29, 58, 0.06)' },
                        angleLines: { color: 'rgba(11, 29, 58, 0.06)' },
                        pointLabels: {
                            color: '#0B1D3A',
                            font: { size: 12, family: "'Inter', sans-serif", weight: '600' },
                            padding: 18
                        }
                    }
                },
                plugins: { legend: { display: false } },
                animation: { duration: 1200, easing: 'easeOutQuart' }
            }
        });
    }

    function hideAll() {
        ['assessment-intro', 'assessment-gate', 'assessment-results'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.style.display = 'none'; el.classList.remove('assessment__fade-in'); }
        });
        for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
            const step = document.getElementById('step-' + i);
            if (step) { step.style.display = 'none'; step.classList.remove('assessment__fade-in'); }
        }
    }
}
