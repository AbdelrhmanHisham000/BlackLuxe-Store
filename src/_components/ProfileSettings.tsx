"use client";

import { useFormStatus } from "react-dom";
import { completeProfile } from "../_lib/actions";

interface User {
  name: string;
  email: string;
  image?: string;
  userId: number;
}
interface Session {
  user: User;
}
interface ProfileFormData {
  phoneNumber: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  nationality: string;
  needsVisa: boolean;
}

interface Props {
  customer: ProfileFormData;
  session: Session;
}
export default function ProfileSettings({ session, customer }: Props) {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-gray-800 p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Shipping Information
          </h2>
          <p className="mb-8 text-gray-400">
            Please provide your complete address details
          </p>

          <form action={completeProfile} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-400">
                Personal Details
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={session.user.name}
                    name="firstName"
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phoneNumber"
                  defaultValue={customer.phoneNumber || ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-400">
                Address Details
              </h3>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-300"
                >
                  Street Address *
                </label>
                <input
                  type="text"
                  id="street"
                  name="streetAddress"
                  defaultValue={customer.streetAddress || ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium text-gray-300"
                >
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  defaultValue={customer.apartment || ""}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-300"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue={customer.city || ""}
                    required
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-300"
                  >
                    State/Province *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    defaultValue={customer.state || ""}
                    required
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-300"
                  >
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    defaultValue={customer.postalCode || ""}
                    required
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-300"
                >
                  Country/Region *
                </label>
                <select
                  id="country"
                  name="country"
                  defaultValue={customer.country || ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>

            {/* Nationality Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-purple-400">
                Nationality Details
              </h3>

              <div>
                <label
                  htmlFor="nationality"
                  className="block text-sm font-medium text-gray-300"
                >
                  Nationality *
                </label>
                <select
                  id="nationality"
                  name="nationality"
                  defaultValue={customer.nationality || ""}
                  required
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 p-2 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select Nationality</option>
                  <option value="US">American</option>
                  <option value="CA">Canadian</option>
                  <option value="UK">British</option>
                  <option value="AU">Australian</option>
                  <option value="DE">German</option>
                  <option value="FR">French</option>
                  <option value="JP">Japanese</option>
                </select>
              </div>
            </div>

            {/* Form Submission */}
            <div className="pt-4">
              <Button />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
function Button() {
  // from react dom to display pending
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`w-full rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none ${pending ? "cursor-not-allowed bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:ring-purple-500 focus:ring-offset-gray-800`}
    >
      {pending ? "Updating..." : "Update Shipping Information"}
    </button>
  );
}
