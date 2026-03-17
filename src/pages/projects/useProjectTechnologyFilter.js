import { useState, useMemo } from "react";
import iconMap from "../../components/iconMap";

export default function useProjectTechnologyFilter(projects) {

    const [includeTech, setIncludeTech] = useState([]);
    const [excludeTech, setExcludeTech] = useState([]);

    const toggleTech = (icon, { exclude = false } = {}) => {

        if (exclude) {

            setExcludeTech(prev =>
                prev.includes(icon)
                    ? prev.filter(i => i !== icon)
                    : [...prev, icon]
            );

            return;
        }

        setIncludeTech(prev =>
            prev.includes(icon)
                ? prev.filter(i => i !== icon)
                : [...prev, icon]
        );
    };

    const clearAll = () => {
        setIncludeTech([]);
        setExcludeTech([]);
    };

    const allIcons = useMemo(() => {

        const icons = [...new Set(projects.flatMap(p => p.icons))];

        icons.sort((a, b) => {
            const aLabel = iconMap[a]?.label || "";
            const bLabel = iconMap[b]?.label || "";
            return aLabel.localeCompare(bLabel);
        });

        return icons;

    }, [projects]);

    const filteredProjects = useMemo(() => {

        return projects.filter(project => {

            const icons = project.icons || [];

            if (excludeTech.some(icon => icons.includes(icon))) {
                return false;
            }

            if (includeTech.length > 0) {
                return includeTech.some(icon => icons.includes(icon));
            }

            return true;

        });

    }, [projects, includeTech, excludeTech]);

    return {
        allIcons,
        includeTech,
        excludeTech,
        toggleTech,
        clearAll,
        filteredProjects
    };
}