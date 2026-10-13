// import { useState } from "react";
// import { Edit3, ShieldCheck, UserRound, CarFront, Check } from "lucide-react";

// import Title from "../components/layout/Title";
// import Avatar from "../components/layout/Avatar";
// import Button from "../components/layout/Button";

// function ProfilePage({ toast }) {
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("Aarav Mehta");
//   return (
//     <>
//       <Title
//         eyebrow="Your account"
//         title="Make it yours."
//         description="Keep your driver details ready so every booking takes less than a minute."
//         action={
//           !editing && (
//             <Button
//               variant="soft"
//               onClick={() => setEditing(true)}
//               data-testid="button-edit-profile"
//             >
//               <Edit3 size={16} /> Edit profile
//             </Button>
//           )
//         }
//       />
//       <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
//         <section className="rounded-3xl bg-[hsl(var(--secondary))] p-6 text-white md:p-8">
//           <Avatar name={name} />
//           <h2 className="mt-5 font-display text-2xl font-bold">{name}</h2>
//           <p className="mt-1 text-sm text-white/55">Member since April 2024</p>
//           <div className="mt-8 grid grid-cols-2 gap-3">
//             <div className="rounded-2xl bg-white/7 p-4">
//               <p className="font-display text-2xl font-bold">12</p>
//               <p className="mt-1 text-xs text-white/55">charging sessions</p>
//             </div>
//             <div className="rounded-2xl bg-white/7 p-4">
//               <p className="font-display text-2xl font-bold">4</p>
//               <p className="mt-1 text-xs text-white/55">slots exchanged</p>
//             </div>
//           </div>
//           <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
//             <ShieldCheck size={17} className="text-[hsl(var(--accent))]" />{" "}
//             Identity verified
//           </div>
//         </section>
//         <section className="space-y-5">
//           <div className="rounded-3xl border bg-[hsl(var(--card))] p-6">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
//                   Personal details
//                 </p>
//                 <h2 className="mt-1 font-display text-xl font-bold">
//                   How we reach you
//                 </h2>
//               </div>
//               <UserRound size={20} />
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 ["Full name", name],
//                 ["Email address", "aarav.mehta@email.com"],
//                 ["Phone number", "+91 98765 41208"],
//                 ["Home city", "Nashik"],
//               ].map(([label, value]) => (
//                 <label
//                   key={label}
//                   className="text-xs font-bold text-[hsl(var(--muted-foreground))]"
//                 >
//                   {label}
//                   <input
//                     disabled={!editing}
//                     value={label === "Full name" ? name : value}
//                     onChange={(e) =>
//                       label === "Full name" && setName(e.target.value)
//                     }
//                     className="mt-2 w-full rounded-xl border bg-transparent p-3 text-sm font-semibold disabled:opacity-70"
//                     data-testid={`input-profile-${label.toLowerCase().replace(" ", "-")}`}
//                   />
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className="rounded-3xl border bg-[hsl(var(--card))] p-6">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
//                   Primary vehicle
//                 </p>
//                 <h2 className="mt-1 font-display text-xl font-bold">
//                   Your EV details
//                 </h2>
//               </div>
//               <CarFront size={20} />
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {[
//                 ["Make & model", "Tata Nexon EV"],
//                 ["Registration", "MH 15 EV 2846"],
//                 ["Battery capacity", "30 kWh"],
//                 ["Connector", "CCS2"],
//               ].map(([x, y]) => (
//                 <div
//                   key={x}
//                   className="rounded-xl bg-[hsl(var(--muted)/.6)] p-3"
//                 >
//                   <p className="text-[10px] font-bold uppercase text-[hsl(var(--muted-foreground))]">
//                     {x}
//                   </p>
//                   <p className="mt-1 text-sm font-bold">{y}</p>
//                 </div>
//               ))}
//             </div>
//             {editing && (
//               <Button
//                 className="mt-6"
//                 onClick={() => {
//                   setEditing(false);
//                   toast("Profile details saved");
//                 }}
//                 data-testid="button-save-profile"
//               >
//                 <Check size={16} /> Save changes
//               </Button>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default ProfilePage;

import { useState, useEffect } from "react";
import {
  Edit3,
  ShieldCheck,
  UserRound,
  CarFront,
  Check,
  X,
} from "lucide-react";

import Title from "../components/layout/Title";
import Avatar from "../components/layout/Avatar";
import Button from "../components/layout/Button";

const initialProfile = {
  name: "Aarav Mehta",
  email: "aarav.mehta@email.com",
  phone: "9876541208",
  city: "Nashik",
  vehicle: "Tata Nexon EV",
  registration: "MH 15 EV 2846",
  batteryCapacity: "30",
  connector: "CCS2",
};

function ProfilePage({ toast }) {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("ev-user-profile");
      return savedProfile
        ? { ...initialProfile, ...JSON.parse(savedProfile) }
        : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [form, setForm] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("ev-user-profile");
      return savedProfile
        ? { ...initialProfile, ...JSON.parse(savedProfile) }
        : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const profileFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.city,
    profile.vehicle,
    profile.registration,
    profile.batteryCapacity,
    profile.connector,
  ];

  const completedFields = [
    Boolean(profile.name.trim()),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim()),
    /^[6-9]\d{9}$/.test(profile.phone.trim()),
    Boolean(profile.city.trim()),
    Boolean(profile.vehicle.trim()),
    Boolean(profile.registration.trim()),
    profile.batteryCapacity.trim() !== "" &&
      Number.isFinite(Number(profile.batteryCapacity)) &&
      Number(profile.batteryCapacity) > 0,
    Boolean(profile.connector.trim()),
  ].filter(Boolean).length;

  const completeness = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const handleEdit = () => {
    setForm({ ...profile });
    setErrors({});
    setEditing(true);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setErrors({});
    setEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.city.trim()) {
      newErrors.city = "Home city is required.";
    }

    if (!form.vehicle.trim()) {
      newErrors.vehicle = "Vehicle model is required.";
    }

    if (!form.registration.trim()) {
      newErrors.registration = "Registration number is required.";
    }

    if (
      form.batteryCapacity.trim() === "" ||
      !Number.isFinite(Number(form.batteryCapacity)) ||
      Number(form.batteryCapacity) <= 0
    ) {
      newErrors.batteryCapacity = "Battery capacity must be greater than zero.";
    }

    if (!form.connector.trim()) {
      newErrors.connector = "Connector type is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast?.("Please correct the highlighted fields.");
      return;
    }

    const updatedProfile = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      vehicle: form.vehicle.trim(),
      registration: form.registration.trim(),
      connector: form.connector.trim(),
      batteryCapacity: String(Number(form.batteryCapacity)),
    };

    // setProfile(updatedProfile);
    // setForm(updatedProfile);

    // localStorage.setItem("ev-user-profile", JSON.stringify(updatedProfile));

    // setErrors({});
    // setEditing(false);

    // toast?.("Profile details saved successfully.");

    try {
      localStorage.setItem("ev-user-profile", JSON.stringify(updatedProfile));

      setProfile(updatedProfile);
      setForm(updatedProfile);

      setErrors({});
      setEditing(false);

      toast?.("Profile details saved successfully.");
    } catch (error) {
      console.error("Unable to save profile:", error);

      toast?.("Unable to save your profile. Please try again.");
    }
  };

  const personalFields = [
    { key: "name", label: "Full name" },
    { key: "email", label: "Email address" },
    { key: "phone", label: "Phone number" },
    { key: "city", label: "Home city" },
  ];

  const vehicleFields = [
    { key: "vehicle", label: "Make & model" },
    { key: "registration", label: "Registration" },
    { key: "batteryCapacity", label: "Battery capacity (kWh)" },
    { key: "connector", label: "Connector type" },
  ];

  const renderField = ({ key, label }) => (
    <label
      key={key}
      className="text-xs font-bold text-[hsl(var(--muted-foreground))]"
    >
      {label}

      <input
        type={
          key === "email"
            ? "email"
            : key === "batteryCapacity"
              ? "number"
              : "text"
        }
        min={key === "batteryCapacity" ? "0.1" : undefined}
        step={key === "batteryCapacity" ? "any" : undefined}
        disabled={!editing}
        value={form[key]}
        onChange={(event) => updateField(key, event.target.value)}
        className={`mt-2 w-full rounded-xl border bg-transparent p-3 text-sm font-semibold disabled:opacity-70 ${
          errors[key] ? "border-red-500" : ""
        }`}
        aria-invalid={Boolean(errors[key])}
        data-testid={`input-profile-${key}`}
      />

      {errors[key] && (
        <span className="mt-1 block text-xs font-medium text-red-500">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <>
      <Title
        eyebrow="Your account"
        title="Make it yours."
        description="Keep your driver details ready so every booking takes less than a minute."
        action={
          !editing && (
            <Button
              variant="soft"
              onClick={handleEdit}
              data-testid="button-edit-profile"
            >
              <Edit3 size={16} />
              Edit profile
            </Button>
          )
        }
      />

      <form onSubmit={handleSave} noValidate>
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          {/* Profile summary */}
          <section className="rounded-3xl bg-[hsl(var(--secondary))] p-6 text-white md:p-8">
            <Avatar name={profile.name} />

            <h2 className="mt-5 font-display text-2xl font-bold">
              {profile.name}
            </h2>

            <p className="mt-1 break-words text-sm text-white/65">
              {profile.email}
            </p>

            <p className="mt-1 text-sm text-white/55">
              Member since April 2024
            </p>

            {/* Profile completeness */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-white/80">
                  Profile completeness
                </p>

                <span className="text-sm font-bold">{completeness}%</span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-label="Profile completeness"
                aria-valuenow={completeness}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-[hsl(var(--accent))] transition-all duration-300"
                  style={{ width: `${completeness}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-white/60">
                {completeness === 100
                  ? "Your profile is complete!"
                  : `${profileFields.length - completedFields} details remaining`}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/7 p-4">
                <p className="font-display text-2xl font-bold">12</p>
                <p className="mt-1 text-xs text-white/65">charging sessions</p>
              </div>

              <div className="rounded-2xl bg-white/7 p-4">
                <p className="font-display text-2xl font-bold">4</p>
                <p className="mt-1 text-xs text-white/65">slots exchanged</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-white/75">
              <ShieldCheck size={17} className="text-[hsl(var(--accent))]" />
              Identity verified
            </div>
          </section>

          <section className="space-y-5">
            {/* Personal details */}
            <div className="rounded-3xl border bg-[hsl(var(--card))] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                    Personal details
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold">
                    How we reach you
                  </h2>
                </div>

                <UserRound size={20} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {personalFields.map(renderField)}
              </div>
            </div>

            {/* Vehicle details */}
            <div className="rounded-3xl border bg-[hsl(var(--card))] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                    Primary vehicle
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold">
                    Your EV details
                  </h2>
                </div>

                <CarFront size={20} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {vehicleFields.map(renderField)}
              </div>
            </div>

            {/* Save and Cancel */}
            {editing && (
              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="border"
                  onClick={handleCancel}
                  data-testid="button-cancel-profile"
                >
                  <X size={16} />
                  Cancel
                </Button>

                <Button type="submit" data-testid="button-save-profile">
                  <Check size={16} />
                  Save changes
                </Button>
              </div>
            )}
          </section>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
