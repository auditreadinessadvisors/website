/* ============================================
   EVALUACIÓN DE PREPARACIÓN — Configuración (Español)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('assessment')) return;
    initAssessmentEngine(esConfig);
});

const esConfig = {
    sections: [
        {
            name: 'Integridad de Estados Financieros',
            questions: [1, 2],
            maxScore: 10,
            recommendations: {
                critical: 'Tus estados financieros pueden contener errores materiales que los auditores señalarán. Se recomienda urgentemente un Diagnóstico de Estados Financieros.',
                weak: 'Tus estados financieros pueden contener errores materiales. Un Diagnóstico de Estados Financieros es recomendable.',
                moderate: 'Tu proceso de cierre financiero tiene espacio para mejorar. La remediación dirigida podría prevenir retrasos en la auditoría.',
                strong: 'Tus procesos de estados financieros parecen sólidos. Un ajuste fino menor podría ser beneficioso.'
            }
        },
        {
            name: 'Normas Contables',
            questions: [3, 4],
            maxScore: 10,
            recommendations: {
                critical: 'Brechas significativas en cumplimiento técnico contable crean riesgo de auditoría importante. Se recomienda urgentemente asesoría técnica contable.',
                weak: 'Brechas en cumplimiento técnico contable crean riesgo de auditoría. Se recomienda asesoría técnica contable.',
                moderate: 'Existen algunas brechas en adopción de estándares. Una revisión enfocada de actualizaciones recientes reduciría tu riesgo.',
                strong: 'Tu cumplimiento de normas parece robusto. Mantén tu documentación actualizada.'
            }
        },
        {
            name: 'Controles Internos',
            questions: [5, 6],
            maxScore: 10,
            recommendations: {
                critical: 'Tu ambiente de control tiene debilidades materiales que los auditores probablemente identificarán. La remediación de controles internos es urgente.',
                weak: 'Tu ambiente de control tiene brechas que los auditores probablemente identificarán. Se recomienda fortalecer los controles internos.',
                moderate: 'Tu marco de controles necesita fortalecimiento dirigido. Abordar brechas clave ahora reducirá la fricción de auditoría.',
                strong: 'Tu ambiente de controles internos parece bien diseñado y documentado.'
            }
        },
        {
            name: 'Preparación para Auditoría',
            questions: [7, 8],
            maxScore: 10,
            recommendations: {
                critical: 'No estás preparado para una auditoría externa. Una auditoría simulada identificaría y resolvería problemas críticos antes de que lleguen los auditores.',
                weak: 'Quedan brechas significativas de preparación para auditoría. Una auditoría simulada o revisión de preparación sería muy beneficiosa.',
                moderate: 'Tienes algo de preparación pero quedan brechas. Una Revisión de Preparación para Auditoría las cerraría eficientemente.',
                strong: 'Pareces bien preparado para un engagement de auditoría externa.'
            }
        },
        {
            name: 'Preparación Organizacional',
            questions: [9, 10],
            maxScore: 10,
            recommendations: {
                critical: 'Tu equipo carece de la estructura y capacidad para apoyar una auditoría eficientemente. Se necesita preparación organizacional antes de contratar auditores.',
                weak: 'Las brechas organizacionales podrían desacelerar significativamente la ejecución de la auditoría y aumentar costos.',
                moderate: 'Algunas brechas organizacionales podrían desacelerar la ejecución de la auditoría. La planificación previa ayudaría.',
                strong: 'Tu organización parece bien estructurada para apoyar una auditoría.'
            }
        }
    ],

    tiers: {
        auditReady: {
            name: 'Listo para Auditoría',
            color: '#22c55e',
            colorLight: 'rgba(34, 197, 94, 0.1)',
            icon: '✓',
            description: 'Tu organización muestra una fuerte preparación para auditoría. Pueden necesitarse ajustes menores, pero estás bien posicionado para comprometer auditores externos con confianza.',
            cta: {
                text: 'Incluso las empresas listas para auditoría se benefician de una revisión independiente. Agenda una consulta para confirmar tu preparación.',
                buttonText: 'Agendar una Consulta',
                buttonLink: 'contacto.html'
            }
        },
        approachingReady: {
            name: 'Casi Listo',
            color: '#eab308',
            colorLight: 'rgba(234, 179, 8, 0.1)',
            icon: '◐',
            description: 'Tienes una base sólida pero hay brechas que podrían llevar a retrasos en la auditoría, ajustes o opiniones calificadas. Una revisión de preparación dirigida eliminaría estos riesgos.',
            cta: {
                text: 'Estás cerca, pero las brechas que identificamos podrían costarte. Déjanos ayudarte a cerrarlas antes de que tus auditores las encuentren.',
                buttonText: 'Agendar Revisión de Preparación',
                buttonLink: 'contacto.html'
            }
        },
        significantGaps: {
            name: 'Brechas Significativas',
            color: '#f97316',
            colorLight: 'rgba(249, 115, 22, 0.1)',
            icon: '⚠',
            description: 'Tu organización tiene brechas materiales en preparación para auditoría. Sin intervención, enfrentas alto riesgo de sorpresas en la auditoría, cronogramas extendidos y remediación costosa durante la auditoría misma.',
            cta: {
                text: 'Los riesgos en tu estado actual son reales. Un engagement de preparación estructurado te ahorrará tiempo, dinero y credibilidad.',
                buttonText: 'Solicitar Diagnóstico de Riesgo',
                buttonLink: 'contacto.html'
            }
        },
        notReady: {
            name: 'No Preparado',
            color: '#ef4444',
            colorLight: 'rgba(239, 68, 68, 0.1)',
            icon: '✕',
            description: 'Tu organización no está preparada para una auditoría externa. Proceder sin un engagement de preparación estructurado sería de alto riesgo. Recomendamos fuertemente una auditoría simulada comprehensiva.',
            cta: {
                text: 'Proceder a auditoría en tu estado actual sería alto riesgo. Recomendamos fuertemente una auditoría simulada comprehensiva.',
                buttonText: 'Agendar Consulta Urgente',
                buttonLink: 'contacto.html'
            }
        }
    },

    labels: {
        progressPrefix: 'Pregunta',
        progressOf: 'de',
        detailedBreakdown: 'Desglose Detallado',
        whatsNext: '¿Qué Sigue?',
        radarLabel: 'Tu Puntaje',
        shareUrl: 'https://auditreadinessadvisors.com/es/evaluacion.html',
        ratingLabels: {
            strong: 'Fuerte',
            moderate: 'Moderado',
            weak: 'Débil',
            critical: 'Crítico'
        }
    }
};
