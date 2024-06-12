import styles from "./PortalNotification.module.css";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import { portalEnums, capitalize, project_data } from "../../utils/common_utils";
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';

export default function PortalNotification({ portal_data }) {
    const bodyData = portal_data.PP_DATA.ppBody;
    const headersData = portal_data.PP_DATA.ppHeaders;
    let portalType = "ppType" in portal_data.PP_DATA ? portal_data.PP_DATA.ppType : "";

    function determinePaymentPortal(a_headers_data) {
        let pp_name = ""
    
        if ("referer" in a_headers_data && a_headers_data["referer"].includes("paygate")) {
            pp_name = "paygate"
        }
    
        return pp_name
    }
    
    function splitTextFormData(a_data) {
        let ret_data = {};
    
        const dataList = a_data.split('&');
        for (let index = 0; index < dataList.length; index++) {
            const formItemSplit = dataList[index].split('=');
            ret_data[`${formItemSplit[0]}`] = formItemSplit[1]
        }
    
        return ret_data;
    }
    
    function getNotificationData(a_payment_portal, a_body_data) {
        let notify_data = {
            "code": "-1",
            "type": "error",
            "message": "Unknown error occurred.",
            "icon": <ErrorIcon className={styles.icon_error}/>
        }
    
        if (a_payment_portal === "paygate") {
            if (a_body_data["TRANSACTION_STATUS"] in portalEnums["paygate"]) {
                const code_data = portalEnums["paygate"][a_body_data["TRANSACTION_STATUS"]]
                notify_data["code"] = a_body_data["TRANSACTION_STATUS"]
                notify_data["type"] = code_data["type"]
                notify_data["message"] = code_data["description"]
            }
        }
    
        if (notify_data["type"] === "warning") {
            notify_data["icon"] = <ReportIcon className={styles.icon_warning}/>
        } else if (notify_data["type"] === "success") {
            notify_data["icon"] = <CheckCircleIcon className={styles.icon_success}/>
        }
    
        return notify_data
    }

    if (portalType === "" && headersData) {
        // Can determine using headers, if they are available
        portalType = portalType !== "" ? portalType : determinePaymentPortal(headersData)
    }
    const notification_data = getNotificationData(portalType,bodyData)

    return (
        <Stack spacing={2} className={styles.container}>
            {notification_data.icon}
            <Typography variant={'h5'}>{capitalize(portalType)} {capitalize(notification_data.type)}</Typography>
            <Typography variant={'body1'}>{notification_data.message}</Typography>
            <Typography variant="body1">
                The transaction status is collected from querying the Payment Portal, see code in {' '}
                <Link href={project_data["git_url"]} target="_blank" rel="noopener">
                    Git
                </Link>.
            </Typography>
        </Stack>
    )
}