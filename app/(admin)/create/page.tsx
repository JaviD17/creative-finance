"use client";

import CreateForm from "./components/CreateForm";

const CreatePage = () => {
  // router.push("/");

  return (
    <main>
      <div className="text-black-950 bg-slate-50 py-8">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Create Deal
        </h2>
        {/* Form Container */}

        <CreateForm />
      </div>
    </main>
  );
};

export default CreatePage;
