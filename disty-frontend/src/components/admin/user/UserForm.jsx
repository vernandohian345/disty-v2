import { useState, useEffect } from "react";

export default function UserForm({
    onSubmit,
    editData,
}) {

    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    useEffect(() => {

        if (editData) {

            setForm({
                username:
                    editData.username || "",

                name:
                    editData.name || "",

                email:
                    editData.email || "",

                password: "",

                role:
                    editData.role || "user",
            });

        }

    }, [editData]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-7"
        >

            {/* GRID */}
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
            ">

                {/* USERNAME */}
                <div>

                    <label className="
                        block
                        mb-3
                        text-sm
                        font-bold
                        text-slate-700
                    ">

                        Username

                    </label>

                    <div className="relative">

                        <i className="
                            fas
                            fa-user
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "></i>

                        <input
                            type="text"
                            name="username"
                            placeholder="Masukkan username"
                            value={form.username}
                            onChange={handleChange}
                            className="
                                w-full
                                pl-14
                                pr-5
                                py-4
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-100
                                focus:border-orange-400
                                transition-all
                            "
                        />

                    </div>

                </div>

                {/* ROLE */}
                <div>

                    <label className="
                        block
                        mb-3
                        text-sm
                        font-bold
                        text-slate-700
                    ">

                        Role

                    </label>

                    <div className="relative">

                        <i className="
                            fas
                            fa-user-shield
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "></i>

                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="
                                w-full
                                pl-14
                                pr-5
                                py-4
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-100
                                focus:border-orange-400
                                transition-all
                                appearance-none
                            "
                        >

                            <option value="user">
                                User
                            </option>

                            <option value="admin">
                                Admin
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {/* NAMA */}
            <div>

                <label className="
                    block
                    mb-3
                    text-sm
                    font-bold
                    text-slate-700
                ">

                    Nama Lengkap

                </label>

                <div className="relative">

                    <i className="
                        fas
                        fa-id-card
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "></i>

                    <input
                        type="text"
                        name="name"
                        placeholder="Masukkan nama lengkap"
                        value={form.name}
                        onChange={handleChange}
                        className="
                            w-full
                            pl-14
                            pr-5
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            focus:outline-none
                            focus:ring-4
                            focus:ring-orange-100
                            focus:border-orange-400
                            transition-all
                        "
                    />

                </div>

            </div>

            {/* EMAIL */}
            <div>

                <label className="
                    block
                    mb-3
                    text-sm
                    font-bold
                    text-slate-700
                ">

                    Email

                </label>

                <div className="relative">

                    <i className="
                        fas
                        fa-envelope
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "></i>

                    <input
                        type="email"
                        name="email"
                        placeholder="Masukkan email"
                        value={form.email}
                        onChange={handleChange}
                        className="
                            w-full
                            pl-14
                            pr-5
                            py-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            focus:outline-none
                            focus:ring-4
                            focus:ring-orange-100
                            focus:border-orange-400
                            transition-all
                        "
                    />

                </div>

            </div>

            {/* PASSWORD */}
            {!editData && (

                <div>

                    <label className="
                        block
                        mb-3
                        text-sm
                        font-bold
                        text-slate-700
                    ">

                        Password

                    </label>

                    <div className="relative">

                        <i className="
                            fas
                            fa-lock
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "></i>

                        <input
                            type="password"
                            name="password"
                            placeholder="Masukkan password"
                            value={form.password}
                            onChange={handleChange}
                            className="
                                w-full
                                pl-14
                                pr-5
                                py-4
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                focus:outline-none
                                focus:ring-4
                                focus:ring-orange-100
                                focus:border-orange-400
                                transition-all
                            "
                        />

                    </div>

                </div>

            )}

            {/* BUTTON */}
            <div className="pt-4">

                <button
                    type="submit"
                    className="
                        w-full
                        py-4
                        rounded-2xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-bold
                        transition-all
                        shadow-lg
                        shadow-orange-200
                    "
                >

                    {
                        editData
                            ? "Update User"
                            : "Tambah User"
                    }

                </button>

            </div>

        </form>

    );
}