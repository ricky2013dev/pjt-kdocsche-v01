import { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  Textarea,
  FormSection,
  Card,
  Tabs,
} from "./common";
import { dummyPatientData } from "../data/dummyPatientData";

const ReservePage = ({ selectedSlot, onBack, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState(dummyPatientData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      }
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [name]: checked,
      },
    }));
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      checklist: {
        symptoms: checked,
        medicalHistory: checked,
        medications: checked,
        allergies: checked,
        consent: checked,
        emergencyContact: checked,
        privacy: checked,
        accuracy: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allChecked = Object.values(formData.checklist).every((val) => val);
    if (!allChecked) {
      alert("Please complete all items in the Medical Pre-Checklist");
      setActiveTab("medical");
      return;
    }

    if (!isPersonalInfoComplete()) {
      alert("Please complete all required personal information");
      setActiveTab("personal");
      return;
    }

    if (!isInsuranceInfoComplete()) {
      alert("Please complete all required insurance information");
      setActiveTab("insurance");
      return;
    }

    onSubmit(formData);
  };

  const isPersonalInfoComplete = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dob &&
      formData.email &&
      formData.phone
    );
  };

  const isInsuranceInfoComplete = () => {
    return formData.insuranceProvider && formData.policyId;
  };

  const isMedicalChecklistComplete = () => {
    return Object.values(formData.checklist).every((val) => val);
  };

  const allChecklistChecked = Object.values(formData.checklist).every(
    (val) => val
  );

  const tabs = [
    {
      id: "personal",
      label: "Personal Info",
      required: true,
      completed: isPersonalInfoComplete(),
    },
    {
      id: "insurance",
      label: "Insurance",
      required: true,
      completed: isInsuranceInfoComplete(),
    },
    {
      id: "medical",
      label: "Medical Checklist",
      required: true,
      completed: isMedicalChecklistComplete(),
    },
    {
      id: "notes",
      label: "Notes",
      required: false,
      completed: formData.patientNotes.length > 0,
    },
  ];

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const isLastTab = activeTab === "notes";
  const isFirstTab = activeTab === "personal";

  return (
    <Card>
      <h2 className="text-xl md:text-3xl font-bold text-green-600 mb-3 md:mb-6">
        Patient Information
      </h2>

      <div className="bg-teal-50 border-l-4 border-teal-500 p-2 md:p-4 mb-3 md:mb-6 rounded">
        <h3 className="text-sm md:text-lg font-semibold text-teal-900 mb-0.5 md:mb-1">
          Selected Time
        </h3>
        <p className="text-sm md:text-base text-teal-800">
          {selectedSlot?.datetime}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <FormSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Date of Birth"
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </FormSection>
          )}

          {/* Insurance Information Tab */}
          {activeTab === "insurance" && (
            <FormSection title="Insurance Information">
              <div className="mb-4">
                <Input
                  label="Insurance Provider / Carrier Name"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Policy ID / Member Number"
                  id="policyId"
                  name="policyId"
                  value={formData.policyId}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Group Number (Optional)"
                  id="groupNumber"
                  name="groupNumber"
                  value={formData.groupNumber}
                  onChange={handleInputChange}
                />
              </div>
            </FormSection>
          )}

          {/* Medical History Tab */}
          {activeTab === "medical" && (
            <FormSection>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                Medical Pre-Checklist <span className="text-red-500">*</span>
              </h3>

              <p className="text-sm md:text-base text-gray-600 mb-4">
                Please review and acknowledge the following items before your visit:
              </p>

              <div className="space-y-2 mb-4">
                <Checkbox
                  id="symptoms"
                  name="symptoms"
                  checked={formData.checklist.symptoms}
                  onChange={handleCheckboxChange}
                  label="I have reviewed and will disclose all current symptoms, health concerns, and reasons for this visit"
                />

                <Checkbox
                  id="medicalHistory"
                  name="medicalHistory"
                  checked={formData.checklist.medicalHistory}
                  onChange={handleCheckboxChange}
                  label="I will provide complete medical history including past illnesses, surgeries, and chronic conditions"
                />

                <Checkbox
                  id="medications"
                  name="medications"
                  checked={formData.checklist.medications}
                  onChange={handleCheckboxChange}
                  label="I will disclose all current medications, vitamins, and supplements I am taking"
                />

                <Checkbox
                  id="allergies"
                  name="allergies"
                  checked={formData.checklist.allergies}
                  onChange={handleCheckboxChange}
                  label="I will report any known allergies to medications, foods, or other substances"
                />

                <Checkbox
                  id="consent"
                  name="consent"
                  checked={formData.checklist.consent}
                  onChange={handleCheckboxChange}
                  label="I consent to medical examination, treatment, and diagnostic procedures as recommended by the physician"
                />

                <Checkbox
                  id="emergencyContact"
                  name="emergencyContact"
                  checked={formData.checklist.emergencyContact}
                  onChange={handleCheckboxChange}
                  label="I understand that I may be asked to provide emergency contact information during my visit"
                />

                <Checkbox
                  id="privacy"
                  name="privacy"
                  checked={formData.checklist.privacy}
                  onChange={handleCheckboxChange}
                  label="I have read and agree to the HIPAA Privacy Policy and Notice of Privacy Practices"
                />

                <Checkbox
                  id="accuracy"
                  name="accuracy"
                  checked={formData.checklist.accuracy}
                  onChange={handleCheckboxChange}
                  label="I confirm that all information provided is true, accurate, and complete to the best of my knowledge"
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <Checkbox
                  id="checkAll"
                  name="checkAll"
                  checked={allChecklistChecked}
                  onChange={handleCheckAll}
                  label="I acknowledge and agree to all of the above"
                  className="bg-green-50 font-semibold"
                />
              </div>
            </FormSection>
          )}

          {/* Additional Notes Tab */}
          {activeTab === "notes" && (
            <FormSection title="Additional Notes (Optional)">
              <Textarea
                label="Reason for visit or special accommodations"
                id="patientNotes"
                name="patientNotes"
                value={formData.patientNotes}
                onChange={handleInputChange}
                placeholder="Please describe the reason for your visit or any special accommodations you may need..."
                rows={6}
              />
            </FormSection>
          )}
        </Tabs>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-col-reverse md:flex-row justify-between gap-2 md:gap-3 mt-4 md:mt-6 border-t pt-4 md:pt-6">
          <div className="flex gap-2 md:gap-3">
            <Button
              type="button"
              onClick={onBack}
              variant="secondary"
              className="flex-1 md:flex-none text-xs md:text-base py-2 md:py-3"
            >
              <span className="hidden md:inline">← Back to Schedule</span>
              <span className="md:hidden">← Schedule</span>
            </Button>
            {!isFirstTab && (
              <Button
                type="button"
                onClick={handlePreviousTab}
                variant="secondary"
                className="flex-1 md:flex-none text-xs md:text-base py-2 md:py-3"
              >
                <span className="hidden md:inline">← Previous</span>
                <span className="md:hidden">← Prev</span>
              </Button>
            )}
          </div>

          <div className="flex gap-2 md:gap-3">
            {!isLastTab ? (
              <Button
                type="button"
                onClick={handleNextTab}
                variant="primary"
                className="w-full md:w-auto text-sm md:text-base py-2.5 md:py-3"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="w-full md:w-auto text-sm md:text-base py-2.5 md:py-3"
              >
                Submit Reservation
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ReservePage;
