import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";
import "./index.css";
import CheckboxIconUrl from "./assets/svg/icon-checkbox-check.svg";
import RadioSelectedIconUrl from "./assets/svg/icon-radio-selected.svg";
import SuccessIconUrl from "./assets/svg/icon-success-check.svg";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  queryType?: string;
  message?: string;
  consent?: string;
}

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!firstName.trim()) {
      newErrors.firstName = "This field is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "This field is required";
    }
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!queryType) {
      newErrors.queryType = "Please select a query type";
    }
    if (!message.trim()) {
      newErrors.message = "This field is required";
    }
    if (!consent) {
      newErrors.consent =
        "To submit this form, please consent to being contacted";
    }
    return newErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setShowSuccessToast(false);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted:", {
        firstName,
        lastName,
        email,
        queryType,
        message,
        consent,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setQueryType("");
      setMessage("");
      setConsent(false);
      setErrors({});
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const { checked } = event.target as HTMLInputElement;
      setConsent(checked);
      if (checked && errors.consent) {
        setErrors((prev) => ({ ...prev, consent: undefined }));
      }
    } else if (name === "query-type") {
      setQueryType(value);

      if (value && errors.queryType) {
        setErrors((prev) => ({ ...prev, queryType: undefined }));
      }
    } else {
      switch (name) {
        case "first-name":
          setFirstName(value);
          break;
        case "last-name":
          setLastName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "message":
          setMessage(value);
          break;
      }

      if (value.trim() && errors[name as keyof Errors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;
    const validationErrors = validateForm();

    if (validationErrors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof Errors],
      }));
    }
  };

  return (
    <>
      <div
        className="mx-auto max-w-4xl rounded-lg bg-white p-6 font-[Karla] sm:p-10"
        id="contact-form-container"
      >
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Contact Us</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="mb-2 block text-base text-gray-600"
              >
                First Name <span className="text-[#0c7d69]">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                value={firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "first-name-error" : undefined
                }
                className={`w-full rounded-md border p-3 focus:ring-1 focus:outline-none ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#929c9b] focus:border-emerald-600 focus:ring-emerald-600"
                }`}
              />
              {errors.firstName && (
                <p
                  id="first-name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="mb-2 block text-base text-gray-600"
              >
                Last Name <span className="text-[#0c7d69]">*</span>
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "last-name-error" : undefined
                }
                className={`w-full rounded-md border p-3 focus:ring-1 focus:outline-none ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#929c9b] focus:border-emerald-600 focus:ring-emerald-600"
                }`}
              />
              {errors.lastName && (
                <p
                  id="last-name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="mb-2 block text-base text-gray-600"
            >
              Email Address <span className="text-[#0c7d69]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="example@email.com"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-md border p-3 focus:ring-1 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[#929c9b] focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label
              id="query-type-label"
              className="mb-2 block text-base text-gray-600"
            >
              Query Type <span className="text-[#0c7d69]">*</span>
            </label>

            <div
              role="radiogroup"
              aria-labelledby="query-type-label"
              aria-describedby={
                errors.queryType ? "query-type-error" : undefined
              }
              className="mt-1 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2"
            >
              <label
                htmlFor="general-enquiry"
                className={`relative flex cursor-pointer items-center gap-4 rounded-md border p-3 transition-colors duration-150 ease-in-out hover:border-emerald-600 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50 ${
                  errors.queryType ? "border-red-500" : "border-[#929c9b]"
                } focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2`}
              >
                <input
                  type="radio"
                  id="general-enquiry"
                  name="query-type"
                  value="General Enquiry"
                  checked={queryType === "General Enquiry"}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="peer absolute h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-emerald-600 focus:outline-none"
                />
                <span className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform rounded-full border border-gray-400 peer-checked:border-emerald-600"></span>
                <img
                  src={RadioSelectedIconUrl}
                  alt=""
                  className="absolute top-1/2 left-4 h-5 w-5 -translate-x-1 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100"
                  aria-hidden="true"
                />

                <span className="ml-8 cursor-pointer text-base select-none">
                  General Enquiry
                </span>
              </label>

              <label
                htmlFor="support-request"
                className={`relative flex cursor-pointer items-center gap-4 rounded-md border p-3 transition-colors duration-150 ease-in-out hover:border-emerald-600 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50 ${
                  errors.queryType ? "border-red-500" : "border-[#929c9b]"
                } focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2`}
              >
                <input
                  type="radio"
                  id="support-request"
                  name="query-type"
                  value="Support Request"
                  checked={queryType === "Support Request"}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="peer absolute h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-emerald-600 focus:outline-none"
                />
                <span className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform rounded-full border border-gray-400 peer-checked:border-emerald-600"></span>
                <img
                  src={RadioSelectedIconUrl}
                  alt=""
                  className="absolute top-1/2 left-4 h-5 w-5 -translate-x-1 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100"
                  aria-hidden="true"
                />
                <span className="ml-8 cursor-pointer text-base select-none">
                  Support Request
                </span>
              </label>
            </div>
            {errors.queryType && (
              <p
                id="query-type-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.queryType}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="message"
              className="mb-2 block text-base text-gray-600"
            >
              Message <span className="text-[#0c7d69]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`h-28 w-full resize-none rounded-md border p-3 focus:ring-1 focus:outline-none ${
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-[#929c9b] focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            ></textarea>
            {errors.message && (
              <p
                id="message-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="relative mt-4">
            <div
              className={`relative flex items-center gap-4 rounded-md ${errors.consent ? "border-red-500" : "border-transparent"}`}
            >
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={consent}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="peer absolute h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 opacity-0 focus:ring-emerald-600 focus:ring-offset-2"
              />
              <span className="pointer-events-none absolute top-0 left-0 flex h-5 w-5 items-center justify-center rounded border border-gray-400 bg-transparent peer-checked:border-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:ring-offset-2">
                {consent && (
                  <img
                    src={CheckboxIconUrl}
                    alt=""
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                )}
              </span>
              <label
                htmlFor="consent"
                className="ml-8 cursor-pointer text-base text-gray-600 select-none"
              >
                I consent to being contacted by the team{" "}
                <span className="text-[#0c7d69]">*</span>
              </label>
            </div>
            {errors.consent && (
              <p
                id="consent-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 w-full cursor-pointer rounded-md bg-[#0c7d69] p-4 text-lg font-semibold text-white transition duration-150 ease-in-out hover:bg-[#065f46] focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

      {showSuccessToast && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-5 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-lg bg-[#06493d] px-6 py-4 text-white shadow-lg sm:bottom-10"
        >
          <img src={SuccessIconUrl} alt="Success" className="h-5 w-5" />
          <p className="font-semibold">Message Sent!</p>
          <p className="text-sm">
            Thanks for completing the form. We'll be in touch soon!
          </p>
        </div>
      )}

      <div className="attribution mt-4 text-center text-xs text-gray-500">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          className="text-emerald-700 hover:text-emerald-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/pipe1os"
          className="text-emerald-700 hover:text-emerald-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          Felipe Arce
        </a>
        .
      </div>
    </>
  );
}

export default App;
