// MongoDB scholarship document field mapping utility
// Use this script to convert old documents to the new schema

/**
 * Convert a legacy scholarship object to the new schema
 * @param {Object} oldDoc
 * @returns {Object}
 */
function mapScholarshipFields(oldDoc) {
  return {
    scholarshipName: oldDoc.name || "",
    universityName: oldDoc.university || "",
    universityImage: oldDoc.photo || "/logo.jpg",
    universityCountry: oldDoc.country || "",
    universityCity: oldDoc.city || "",
    universityWorldRank: oldDoc.worldRank || "",
    subjectCategory: oldDoc.category || "",
    scholarshipCategory: oldDoc.scholarshipCategory || "",
    degree: oldDoc.degree || "",
    tuitionFees: oldDoc.tuitionFees || "",
    applicationFees: oldDoc.applicationFees || oldDoc.fees || "",
    serviceCharge: oldDoc.serviceCharge || "",
    applicationDeadline: oldDoc.applicationDeadline || "",
    scholarshipPostDate: oldDoc.postDate || new Date().toISOString(),
    postedUserEmail: oldDoc.postedUserEmail || "",
    status: oldDoc.status || "Active"
  };
}

// Example usage:
// const newDoc = mapScholarshipFields(oldDoc);
// Then insert/update newDoc into MongoDB

module.exports = { mapScholarshipFields };