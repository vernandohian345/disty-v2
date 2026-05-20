import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../layouts/AdminLayout";

import UserForm from "../../../components/admin/user/UserForm";

import {
    createUser,
} from "../../../services/UserService";

export default function CreateUser() {

    const navigate = useNavigate();

    const handleSubmit =
        async (formData) => {

            try {

                await createUser(
                    formData
                );

                navigate(
                    "/admin/users"
                );

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <AdminLayout>

            {/* HEADER */}
            <div className="mb-8">

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    flex-wrap
                ">

                    <div>

                        <h1 className="
                            text-4xl
                            font-black
                            text-slate-800
                        ">

                            Tambah User

                        </h1>

                        <p className="
                            text-slate-500
                            mt-2
                        ">

                            Tambahkan akun admin atau user baru

                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/users"
                            )
                        }
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            bg-slate-200
                            hover:bg-slate-300
                            transition-all
                            font-bold
                            text-slate-700
                        "
                    >

                        ← Kembali

                    </button>

                </div>

            </div>

            {/* FORM CARD */}
            <div className="
                bg-white
                rounded-[35px]
                border
                border-slate-100
                shadow-sm
                overflow-hidden
            ">

                {/* TOP */}
                <div className="
                    px-8
                    py-6
                    border-b
                    border-slate-100
                    bg-gradient-to-r
                    from-orange-50
                    to-white
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-orange-500
                            flex
                            items-center
                            justify-center
                            text-white
                            text-xl
                        ">

                            <i className="
                                fas
                                fa-user-plus
                            "></i>

                        </div>

                        <div>

                            <h2 className="
                                text-2xl
                                font-black
                                text-slate-800
                            ">

                                Form User

                            </h2>

                            <p className="
                                text-slate-500
                                mt-1
                            ">

                                Lengkapi data user dashboard

                            </p>

                        </div>

                    </div>

                </div>

                {/* BODY */}
                <div className="
                    p-8
                ">

                    <UserForm
                        onSubmit={handleSubmit}
                    />

                </div>

            </div>

        </AdminLayout>

    );
}