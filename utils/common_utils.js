import CryptoJS from 'crypto-js';

export const portalEnums = require("../public/data/payment_enums.json");

export const project_data = require("../public/data/data.json");
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

export function paygate_checksum(a_data,a_encryptionKey) {
    const checksumString = Object.values(a_data).join('') + a_encryptionKey;
    return CryptoJS.MD5(checksumString).toString();
}

export function parsePaygateData(a_data) {
    const keyValuePairs = a_data.split('&');

    const result = {};
    keyValuePairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key] = value;
    });
    
    return result;
}

export function generateReference(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let reference = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      reference += characters[randomIndex];
    }
    
    return reference;
  }