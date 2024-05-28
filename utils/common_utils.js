export const portalEnums = require("../data/payment_enums.json");

export const project_data = require("../data/data.json");
export const project_portals = project_data["portals"];
export const project_steps = project_data["steps"];
export const project_description = project_data["project_description"];
export const project_paygate = project_data["paygate"];

export function getPortalData(a_portal) {
    if (a_portal === "paygate") {
        return project_paygate
    }
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}