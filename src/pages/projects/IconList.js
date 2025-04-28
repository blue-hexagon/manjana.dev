import React from "react";
import {IconContext} from "react-icons";
import iconMap from "../../components/iconMap";

const IconList = ({icons}) => {
    return (
        <div style={{display: "flex", gap: "12px",flexWrap: "wrap", justifyContent: "start"}}>
            <IconContext.Provider value={{size: "32px", color: "#4A4A4A"}}>
                {icons?.map((IconComponent, index) => {
                    const iconEntry = Object.entries(iconMap).find(([key, {icon}]) => icon === IconComponent);
                    const label = iconEntry ? iconEntry[1].label : "Not defined";

                    return (
                        <div key={index} style={{textAlign: "center"}}>
                            <IconComponent/>
                            {/*<p style={{fontSize: "0.8em", marginTop: "8px"}}>*/}
                            {/*    {label}*/}
                            {/*</p>*/}
                        </div>
                    );
                })}
            </IconContext.Provider>
        </div>
    );
};
export default IconList;