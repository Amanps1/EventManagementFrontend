import axios from "axios";

export const getSystemHealth = () => axios.get("/api/admin/system-health");
export const getAuditLogs = () => axios.get("/api/admin/audit-logs");
export const triggerBackup = () => axios.post("/api/admin/backup");
export const getStatistics = () => axios.get("/api/admin/statistics");
export const getSystemSettings = () => axios.get("/api/admin/settings");
export const updateSystemSettings = (key, value) =>
  axios.put("/api/admin/settings", { key, value });
