import {useState, useMemo} from "react";
import iconMap from "../../components/iconMap";

export default function useProjectTechnologyFilter(projects) {
    const [includeTech, setIncludeTech] = useState([]);
    const [excludeTech, setExcludeTech] = useState([]);

    // ─────────────────────────────────────────────
    // Toggle logic
    // ─────────────────────────────────────────────
    const toggleTech = (icon, {exclude = false} = {}) => {
        if (exclude) {
            setExcludeTech(prev => {
                const exists = prev.includes(icon);

                return exists
                    ? prev.filter(i => i !== icon)
                    : [...prev, icon];
            });

            // 🔥 ensure mutual exclusivity
            setIncludeTech(prev => prev.filter(i => i !== icon));

            return;
        }

        setIncludeTech(prev => {
            const exists = prev.includes(icon);

            return exists
                ? prev.filter(i => i !== icon)
                : [...prev, icon];
        });

        // 🔥 ensure mutual exclusivity
        setExcludeTech(prev => prev.filter(i => i !== icon));
    };
    const clearAll = () => {
        setIncludeTech([]);
        setExcludeTech([]);
    };

    // ─────────────────────────────────────────────
    // Normalize project icons
    // ─────────────────────────────────────────────
    const safeProjects = useMemo(() => {
        return projects.map(p => ({
            ...p,
            icons: Array.isArray(p.icons) ? p.icons : []
        }));
    }, [projects]);

    // ─────────────────────────────────────────────
    // Get all unique icons
    // ─────────────────────────────────────────────
    const allIcons = useMemo(() => {
        const icons = [...new Set(safeProjects.flatMap(p => p.icons))];

        icons.sort((a, b) => {
            const aLabel = iconMap[a]?.label || "";
            const bLabel = iconMap[b]?.label || "";
            return aLabel.localeCompare(bLabel);
        });

        return icons;
    }, [safeProjects]);

    // ─────────────────────────────────────────────
    // Core filter function (reusable)
    // ─────────────────────────────────────────────
    const applyFilters = (projects, include, exclude) => {
        return projects.filter(project => {
            const icons = project.icons;

            // Exclude always wins
            if (exclude.some(icon => icons.includes(icon))) {
                return false;
            }

            // Include = AND logic
            if (include.length > 0) {
                return include.every(icon => icons.includes(icon));
            }

            return true;
        });
    };

    // ─────────────────────────────────────────────
    // Current filtered result
    // ─────────────────────────────────────────────
    const filteredProjects = useMemo(() => {
        return applyFilters(safeProjects, includeTech, excludeTech);
    }, [safeProjects, includeTech, excludeTech]);

    // ─────────────────────────────────────────────
    // Predictive counts per icon (UX CORE)
    // ─────────────────────────────────────────────
    const iconStats = useMemo(() => {
        return allIcons.map(icon => {
            const isIncluded = includeTech.includes(icon);
            const isExcluded = excludeTech.includes(icon);

            // ───── simulate INCLUDE
            let includeNext = includeTech.includes(icon)
                ? includeTech.filter(i => i !== icon)
                : [...includeTech, icon];

            let includeExcludeNext = excludeTech.filter(i => i !== icon);

            const includeResult = applyFilters(
                safeProjects,
                includeNext,
                includeExcludeNext
            );

            // ───── simulate EXCLUDE
            let excludeNext = excludeTech.includes(icon)
                ? excludeTech.filter(i => i !== icon)
                : [...excludeTech, icon];

            let excludeIncludeNext = includeTech.filter(i => i !== icon);

            const excludeResult = applyFilters(
                safeProjects,
                excludeIncludeNext,
                excludeNext
            );

            return {
                icon,
                label: iconMap[icon]?.label || icon,

                isIncluded,
                isExcluded,

                // Current visible count
                currentCount: filteredProjects.length,

                // Predictive counts
                includeCount: includeResult.length,
                excludeCount: excludeResult.length,

                // Default display logic
                count: isIncluded
                    ? filteredProjects.length
                    : isExcluded
                        ? filteredProjects.length
                        : includeResult.length,

                // UX signals
                includeZero: includeResult.length === 0,
                excludeZero: excludeResult.length === 0,
            };
        });
    }, [allIcons, includeTech, excludeTech, safeProjects, filteredProjects]);
    // ─────────────────────────────────────────────
    return {
        allIcons,
        iconStats,
        includeTech,
        excludeTech,
        toggleTech,
        clearAll,
        filteredProjects
    };
}