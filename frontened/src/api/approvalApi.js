import axios from "axios";

export const getPendingApprovals = () => axios.get("/api/approvals/pending");
export const submitForApproval = (eventId) =>
  axios.post(`/api/events/${eventId}/submit-for-approval`);
export const updateApprovalStatus = (approvalId, status, comments) =>
  axios.put(`/api/approvals/${approvalId}`, null, {
    params: { status, comments },
  });
export const getApprovalHistory = () => axios.get("/api/approvals/history");
export const addApprovalComment = (approvalId, comment) =>
  axios.post(`/api/approvals/${approvalId}/comments`, null, {
    params: { comment },
  });
