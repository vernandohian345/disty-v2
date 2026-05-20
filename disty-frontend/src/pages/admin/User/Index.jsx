import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import UserTable from "../../../components/admin/user/UserTable";
import UserModal from "../../../components/admin/user/UserModal";
import DeleteModal from "../../../components/admin/user/DeleteModal";
import { useNavigate } from "react-router-dom";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../../../services/userService";

export default function IndexUser() {

    const navigate = useNavigate();

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [openModal, setOpenModal] =
        useState(false);

    const [editData, setEditData] =
        useState(null);

    const [deleteModal, setDeleteModal] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState(null);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getUsers();

                setUsers(
                    response.data.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    const handleSubmit =
        async (formData) => {

            try {

                if (editData) {

                    await updateUser(
                        editData.id,
                        formData
                    );

                } else {

                    await createUser(
                        formData
                    );

                }

                await fetchUsers();

                setOpenModal(false);

                setEditData(null);

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
    async () => {

        try {

            await deleteUser(
                selectedUser.id
            );

            await fetchUsers();

            setDeleteModal(false);

            setSelectedUser(null);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredUsers =
        users.filter((item) =>
            item.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <AdminLayout>

            {/* HEADER */}
            <div className="
                flex
                items-center
                justify-between
                mb-8
            ">

                <div>

                    <h1 className="
                        text-4xl
                        font-black
                        text-slate-800
                    ">

                        Kelola User

                    </h1>

                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Manage seluruh akun admin dan user

                    </p>

                </div>

                <button
                    onClick={() => {
                        navigate(
                            "/admin/users/create"
                        );
                    }}
                    className="
                        px-6
                        py-4
                        rounded-2xl
                        bg-orange-500
                        hover:bg-orange-600
                        transition-all
                        text-white
                        font-bold
                        shadow-lg
                        shadow-orange-200
                    "
                >

                    + Tambah User

                </button>

            </div>

            {/* STATS CARD */}
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
                mb-6
            ">

                {/* TOTAL USER */}
                <div className="
                    bg-white
                    rounded-[30px]
                    p-7
                    shadow-sm
                    border
                    border-slate-100
                    relative
                    overflow-hidden
                ">

                    <div className="
                        absolute
                        -right-8
                        -top-8
                        w-36
                        h-36
                        rounded-full
                        bg-orange-100/50
                    "></div>

                    <div className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                    ">

                        <div>

                            <p className="
                                text-slate-500
                                font-medium
                            ">

                                Total User

                            </p>

                            <h2 className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            ">

                                {users.length}

                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-3
                            ">

                                Semua akun dashboard

                            </p>

                        </div>

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                            text-orange-500
                            text-2xl
                        ">

                            <i className="
                                fas
                                fa-users
                            "></i>

                        </div>

                    </div>

                </div>

                {/* ADMIN */}
                <div className="
                    bg-white
                    rounded-[30px]
                    p-7
                    shadow-sm
                    border
                    border-slate-100
                    relative
                    overflow-hidden
                ">

                    <div className="
                        absolute
                        -right-8
                        -top-8
                        w-36
                        h-36
                        rounded-full
                        bg-orange-100/50
                    "></div>

                    <div className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                    ">

                        <div>

                            <p className="
                                text-slate-500
                                font-medium
                            ">

                                Total Admin

                            </p>

                            <h2 className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            ">

                                {
                                    users.filter(
                                        (item) =>
                                            item.role ===
                                            "admin"
                                    ).length
                                }

                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-3
                            ">

                                Administrator dashboard

                            </p>

                        </div>

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                            text-orange-500
                            text-2xl
                        ">

                            <i className="
                                fas
                                fa-user-shield
                            "></i>

                        </div>

                    </div>

                </div>

                {/* USER */}
                <div className="
                    bg-white
                    rounded-[30px]
                    p-7
                    shadow-sm
                    border
                    border-slate-100
                    relative
                    overflow-hidden
                ">

                    <div className="
                        absolute
                        -right-8
                        -top-8
                        w-36
                        h-36
                        rounded-full
                        bg-blue-100/50
                    "></div>

                    <div className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                    ">

                        <div>

                            <p className="
                                text-slate-500
                                font-medium
                            ">

                                Total User Biasa

                            </p>

                            <h2 className="
                                text-5xl
                                font-black
                                text-slate-800
                                mt-4
                            ">

                                {
                                    users.filter(
                                        (item) =>
                                            item.role ===
                                            "user"
                                    ).length
                                }

                            </h2>

                            <p className="
                                text-sm
                                text-slate-400
                                mt-3
                            ">

                                User biasa dashboard

                            </p>

                        </div>

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-500
                            text-2xl
                        ">

                            <i className="
                                fas
                                fa-user
                            "></i>

                        </div>

                    </div>

                </div>

            </div>

            {/* SEARCH */}
            <div className="
                bg-white
                rounded-3xl
                p-5
                mb-6
                border
                border-slate-100
            ">

                <div className="relative">

                    <i className="
                        fas
                        fa-search
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "></i>

                    <input
                        type="text"
                        placeholder="Cari user..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            pl-14
                            pr-5
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            focus:outline-none
                            focus:ring-4
                            focus:ring-orange-100
                            focus:border-orange-400
                        "
                    />

                </div>

            </div>

            {/* TABLE */}
            <UserTable
                data={filteredUsers}
                loading={loading}
                onEdit={(item) => {

                    setEditData(item);

                    setOpenModal(true);

                }}
                onDelete={(item) => {

                    setSelectedUser(item);

                    setDeleteModal(true);

                }}
            />

            {/* MODAL */}
            <UserModal
                isOpen={openModal}
                onClose={() => {

                    setOpenModal(false);

                    setEditData(null);

                }}
                onSubmit={handleSubmit}
                editData={editData}
            />

            <DeleteModal
                isOpen={deleteModal}
                onClose={() => {

                    setDeleteModal(false);

                    setSelectedUser(null);

                }}
                onDelete={handleDelete}
                title={selectedUser?.name}
            />

        </AdminLayout>

    );
}