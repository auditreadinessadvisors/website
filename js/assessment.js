/* ============================================
   AUDIT READINESS ASSESSMENT — English Config
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('assessment')) return;
    initAssessmentEngine(enConfig);
});

const enConfig = {
    sections: [
        {
            name: 'Financial Statement Integrity',
            questions: [1, 2],
            maxScore: 10,
            recommendations: {
                critical: 'Your financial statements may contain material misstatements that auditors will flag. A Financial Statement Diagnostic is strongly recommended.',
                weak: 'Your financial statements may contain material misstatements that auditors will flag. A Financial Statement Diagnostic is recommended.',
                moderate: 'Your financial close process has room for improvement. Targeted remediation could prevent audit delays and costly adjustments.',
                strong: 'Your financial statement processes appear solid. Minor fine-tuning may still be beneficial.'
            }
        },
        {
            name: 'Accounting Standards',
            questions: [3, 4],
            maxScore: 10,
            recommendations: {
                critical: 'Significant gaps in technical accounting compliance create major audit risk. Technical accounting advisory is urgently recommended.',
                weak: 'Gaps in technical accounting compliance create audit risk. Technical accounting advisory is recommended.',
                moderate: 'Some standards adoption gaps exist. A focused review of recent updates would reduce your audit risk.',
                strong: 'Your standards compliance appears robust. Keep your documentation current.'
            }
        },
        {
            name: 'Internal Controls',
            questions: [5, 6],
            maxScore: 10,
            recommendations: {
                critical: 'Your control environment has material weaknesses that auditors will likely identify. Internal controls remediation is urgent.',
                weak: 'Your control environment has gaps that auditors will likely identify. Internal controls strengthening is recommended.',
                moderate: 'Your controls framework needs targeted strengthening. Addressing key gaps now will reduce audit friction.',
                strong: 'Your internal controls environment appears well-designed and documented.'
            }
        },
        {
            name: 'Audit Preparedness',
            questions: [7, 8],
            maxScore: 10,
            recommendations: {
                critical: 'You are not prepared for an external audit. A mock audit would identify and resolve critical issues before auditors arrive.',
                weak: 'Significant audit preparation gaps remain. A mock audit or readiness review would be highly beneficial.',
                moderate: 'You have some preparation but gaps remain. An Audit Readiness Review would close these gaps efficiently.',
                strong: 'You appear well-prepared for an external audit engagement.'
            }
        },
        {
            name: 'Organizational Readiness',
            questions: [9, 10],
            maxScore: 10,
            recommendations: {
                critical: 'Your team lacks the structure and capacity to support an audit efficiently. Organizational preparation is needed before engaging auditors.',
                weak: 'Organizational gaps could significantly slow down audit execution and increase costs.',
                moderate: 'Some organizational gaps could slow audit execution. Pre-audit planning would help.',
                strong: 'Your organization appears well-structured to support an audit.'
            }
        }
    ],

    tiers: {
        auditReady: {
            name: 'Audit Ready',
            color: '#22c55e',
            colorLight: 'rgba(34, 197, 94, 0.1)',
            icon: '✓',
            description: 'Your organization shows strong audit readiness. Minor refinements may be needed, but you are well-positioned to engage external auditors with confidence.',
            cta: {
                text: 'Even audit-ready companies benefit from an independent review. Schedule a consultation to confirm your readiness and identify any blind spots.',
                buttonText: 'Book a Consultation',
                buttonLink: 'contact.html'
            }
        },
        approachingReady: {
            name: 'Approaching Ready',
            color: '#eab308',
            colorLight: 'rgba(234, 179, 8, 0.1)',
            icon: '◐',
            description: 'You have a solid foundation but there are gaps that could lead to audit delays, adjustments, or qualified opinions. A targeted readiness review would eliminate these risks.',
            cta: {
                text: 'You\'re close, but the gaps we identified could cost you. Let us help you close them before your auditors find them.',
                buttonText: 'Schedule an Audit Readiness Review',
                buttonLink: 'contact.html'
            }
        },
        significantGaps: {
            name: 'Significant Gaps',
            color: '#f97316',
            colorLight: 'rgba(249, 115, 22, 0.1)',
            icon: '⚠',
            description: 'Your organization has material gaps in audit preparedness. Without intervention, you face a high risk of audit surprises, extended timelines, and costly remediation during the audit itself.',
            cta: {
                text: 'The risks in your current state are real. A structured readiness engagement will save you time, money, and credibility.',
                buttonText: 'Request a Risk Diagnostic',
                buttonLink: 'contact.html'
            }
        },
        notReady: {
            name: 'Not Ready',
            color: '#ef4444',
            colorLight: 'rgba(239, 68, 68, 0.1)',
            icon: '✕',
            description: 'Your organization is not prepared for an external audit. Proceeding without a structured readiness engagement would be high-risk. We strongly recommend a comprehensive mock audit and remediation plan.',
            cta: {
                text: 'Proceeding to audit in your current state would be high-risk. We strongly recommend a comprehensive mock audit.',
                buttonText: 'Book an Urgent Consultation',
                buttonLink: 'contact.html'
            }
        }
    },

    labels: {
        progressPrefix: 'Question',
        progressOf: 'of',
        detailedBreakdown: 'Detailed Breakdown',
        whatsNext: "What's Next?",
        radarLabel: 'Your Score',
        shareUrl: 'https://auditreadinessadvisors.com/assessment.html',
        ratingLabels: {
            strong: 'Strong',
            moderate: 'Moderate',
            weak: 'Weak',
            critical: 'Critical'
        }
    }
};
