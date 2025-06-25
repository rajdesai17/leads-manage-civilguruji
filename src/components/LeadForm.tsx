import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api";

export interface Lead {
  _id?: string;
  name: string;
  phone: string;
  altPhone?: string;
  email: string;
  altEmail?: string;
  status: string;
  qualification: string;
  interestField: string;
  source: string;
  assignedTo: string;
  jobInterest?: string;
  state?: string;
  city?: string;
  passoutYear?: string;
  heardFrom?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LeadFormProps {
  onSuccess: () => void;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  altPhone: yup.string().optional(),
  altEmail: yup.string().email("Invalid email").optional(),
  status: yup.string().required("Status is required"),
  qualification: yup.string().required("Qualification is required"),
  interestField: yup.string().required("Interest field is required"),
  source: yup.string().required("Source is required"),
  assignedTo: yup.string().required("Assigned To is required"),
  jobInterest: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  passoutYear: yup.string().optional(),
  heardFrom: yup.string().optional(),
});

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Lead) => {
    try {
      await api.post("/leads", data);
      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add lead. Please try again.");
    }
  };

  const statusOptions = [
    { value: "Follow-Up", label: "Follow-Up" },
    { value: "Qualified", label: "Qualified" },
    { value: "Converted", label: "Converted" },
    { value: "New", label: "New" },
  ];

  const qualificationOptions = [
    { value: "High School", label: "High School" },
    { value: "Bachelors", label: "Bachelors" },
    { value: "Masters", label: "Masters" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" },
  ];

  const interestOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
  ];

  const sourceOptions = [
    { value: "Website", label: "Website" },
    { value: "Social Media", label: "Social Media" },
    { value: "Email Campaign", label: "Email Campaign" },
    { value: "Cold Call", label: "Cold Call" },
    { value: "Referral", label: "Referral" },
  ];

  const assignedToOptions = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Emily Davis", label: "Emily Davis" },
    { value: "Robert Johnson", label: "Robert Johnson" },
  ];

  const jobInterestOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("name")}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("phone")}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt. Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("altPhone")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alt. Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("altEmail")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("status")}
            disabled={isSubmitting}
          >
            <option value="">Select status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualification
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("qualification")}
            disabled={isSubmitting}
          >
            <option value="">Select qualification</option>
            {qualificationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.qualification && (
            <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Field
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("interestField")}
            disabled={isSubmitting}
          >
            <option value="">Select interest field</option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.interestField && (
            <p className="text-red-500 text-sm mt-1">{errors.interestField.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("source")}
            disabled={isSubmitting}
          >
            <option value="">Select source</option>
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assigned To
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("assignedTo")}
            disabled={isSubmitting}
          >
            <option value="">Select assignee</option>
            {assignedToOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">{errors.assignedTo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Interest
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("jobInterest")}
            disabled={isSubmitting}
          >
            <option value="">Select job interest</option>
            {jobInterestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("state")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("city")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passout Year
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("passoutYear")}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heard From
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("heardFrom")}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Lead"}
        </button>
      </div>
    </form>
  );
};

export default LeadForm; 