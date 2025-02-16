"use client";

import CreateUserForm from "../../../components/users/create-admin/create-admin-form";

const CreateUser = () => {
    return (
        <div className="flex">
            <main className="w-full">
                {/*<section*/}
                {/*    className="bg-white max-lg:container lg:w-full min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)] py-4 lg:p-7 mt-[72px] lg:mt-20 max-lg:pb-20"*/}
                {/*>*/}
                    <CreateUserForm />
                {/*</section >*/}
            </main >
        </div >

    )
};

export default CreateUser

