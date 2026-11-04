"use client";

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

const NewsletterSubscribersPage = () => {
    const [subscribers, setSubscribers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [deletingId, setDeletingId] =
        useState("");

    const loadSubscribers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "/api/newsletter/admin",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Failed to load subscribers."
                );
            }

            setSubscribers(
                Array.isArray(
                    data?.subscribers
                )
                    ? data.subscribers
                    : []
            );
        } catch (error) {
            console.error(
                "Newsletter dashboard error:",
                error
            );

            setError(
                error?.message ||
                    "Unable to load subscribers."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubscribers();
    }, []);

    const filteredSubscribers =
        useMemo(() => {
            const value =
                search
                    .trim()
                    .toLowerCase();

            if (!value) {
                return subscribers;
            }

            return subscribers.filter(
                (subscriber) =>
                    subscriber?.email
                        ?.toLowerCase()
                        .includes(value)
            );
        }, [subscribers, search]);

    const deleteSubscriber = async (
        id
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to remove this subscriber?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            const response =
                await fetch(
                    "/api/newsletter/admin",
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            id,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Failed to delete subscriber."
                );
            }

            setSubscribers(
                (current) =>
                    current.filter(
                        (subscriber) =>
                            subscriber._id !==
                            id
                    )
            );
        } catch (error) {
            console.error(
                "Delete subscriber error:",
                error
            );

            alert(
                error?.message ||
                    "Unable to delete subscriber."
            );
        } finally {
            setDeletingId("");
        }
    };

    const exportCSV = () => {
        if (
            subscribers.length === 0
        ) {
            alert(
                "There are no subscribers to export."
            );

            return;
        }

        const header =
            "Email,Subscribed At";

        const rows =
            subscribers.map(
                (subscriber) => {
                    const email =
                        `"${String(
                            subscriber.email ||
                                ""
                        ).replace(
                            /"/g,
                            '""'
                        )}"`;

                    const date =
                        subscriber.subscribedAt
                            ? new Date(
                                  subscriber.subscribedAt
                              ).toLocaleString()
                            : "";

                    return `${email},"${date}"`;
                }
            );

        const csv = [
            header,
            ...rows,
        ].join("\n");

        const blob =
            new Blob([csv], {
                type: "text/csv;charset=utf-8;",
            });

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;
        link.download =
            `morven-newsletter-subscribers-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen bg-[#f8f8f7] px-5 py-10 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">

                    <div>
                        <p
                            className="
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.3em]
                                text-gray-500
                            "
                        >
                            MORVEN JOURNAL
                        </p>

                        <h1
                            className="
                                mt-3
                                text-3xl
                                font-medium
                                tracking-[-0.03em]
                                text-black
                                sm:text-4xl
                            "
                        >
                            Newsletter Subscribers
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            Manage customers who have
                            subscribed to receive Morven
                            collections, style inspiration
                            and exclusive offers.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={
                                loadSubscribers
                            }
                            className="
                                border
                                border-black/15
                                bg-white
                                px-5
                                py-3
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-black
                                transition
                                hover:border-black
                            "
                        >
                            Refresh
                        </button>

                        <button
                            type="button"
                            onClick={
                                exportCSV
                            }
                            className="
                                bg-black
                                px-5
                                py-3
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-white
                                transition
                                hover:bg-gray-800
                            "
                        >
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="border border-black/10 bg-white p-6">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                            Total Subscribers
                        </p>

                        <p className="mt-3 text-3xl font-medium text-black">
                            {subscribers.length}
                        </p>
                    </div>

                    <div className="border border-black/10 bg-white p-6">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                            Showing
                        </p>

                        <p className="mt-3 text-3xl font-medium text-black">
                            {
                                filteredSubscribers.length
                            }
                        </p>
                    </div>

                    <div className="border border-black/10 bg-black p-6 text-white">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                            Status
                        </p>

                        <p className="mt-3 text-lg font-medium">
                            Newsletter Active
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-md">
                        <input
                            type="email"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target
                                        .value
                                )
                            }
                            placeholder="Search subscriber email..."
                            className="
                                h-12
                                w-full
                                border
                                border-black/10
                                bg-white
                                px-4
                                text-sm
                                text-black
                                outline-none
                                transition
                                focus:border-black
                            "
                        />
                    </div>

                    {search && (
                        <button
                            type="button"
                            onClick={() =>
                                setSearch("")
                            }
                            className="text-[9px] font-medium uppercase tracking-[0.15em] text-gray-500 hover:text-black"
                        >
                            Clear Search
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="mt-6 overflow-hidden border border-black/10 bg-white">

                    {loading ? (
                        <div className="flex min-h-[350px] items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="h-7 w-7 animate-spin rounded-full border border-black/10 border-t-black" />

                                <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                                    Loading subscribers
                                </p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex min-h-[350px] items-center justify-center px-6 text-center">
                            <div>
                                <p className="text-lg font-medium text-black">
                                    Unable to load subscribers
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        loadSubscribers
                                    }
                                    className="mt-6 bg-black px-5 py-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    ) : filteredSubscribers.length ===
                      0 ? (
                        <div className="flex min-h-[350px] items-center justify-center px-6 text-center">
                            <div>
                                <p className="text-lg font-medium text-black">
                                    {search
                                        ? "No subscribers found"
                                        : "No subscribers yet"}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    {search
                                        ? "Try a different email search."
                                        : "Newsletter subscribers will appear here when customers subscribe."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-black/10 bg-[#fafafa]">
                                            <th className="px-6 py-4 text-left text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                                                #
                                            </th>

                                            <th className="px-6 py-4 text-left text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-left text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                                                Subscribed
                                            </th>

                                            <th className="px-6 py-4 text-right text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredSubscribers.map(
                                            (
                                                subscriber,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        subscriber._id
                                                    }
                                                    className="border-b border-black/5 transition hover:bg-[#fafafa]"
                                                >
                                                    <td className="px-6 py-5 text-sm text-gray-400">
                                                        {String(
                                                            index +
                                                                1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-medium text-black">
                                                            {
                                                                subscriber.email
                                                            }
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-5 text-sm text-gray-500">
                                                        {subscriber.subscribedAt
                                                            ? new Date(
                                                                  subscriber.subscribedAt
                                                              ).toLocaleString()
                                                            : "—"}
                                                    </td>

                                                    <td className="px-6 py-5 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteSubscriber(
                                                                    subscriber._id
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                subscriber._id
                                                            }
                                                            className="text-[9px] font-medium uppercase tracking-[0.15em] text-red-500 transition hover:text-red-700 disabled:opacity-40"
                                                        >
                                                            {deletingId ===
                                                            subscriber._id
                                                                ? "Removing..."
                                                                : "Remove"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="divide-y divide-black/5 md:hidden">
                                {filteredSubscribers.map(
                                    (
                                        subscriber,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                subscriber._id
                                            }
                                            className="p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400">
                                                        Subscriber{" "}
                                                        {String(
                                                            index +
                                                                1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </p>

                                                    <p className="mt-2 break-all text-sm font-medium text-black">
                                                        {
                                                            subscriber.email
                                                        }
                                                    </p>

                                                    <p className="mt-2 text-xs text-gray-400">
                                                        {subscriber.subscribedAt
                                                            ? new Date(
                                                                  subscriber.subscribedAt
                                                              ).toLocaleString()
                                                            : "—"}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteSubscriber(
                                                            subscriber._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        subscriber._id
                                                    }
                                                    className="shrink-0 text-[8px] font-medium uppercase tracking-[0.12em] text-red-500 disabled:opacity-40"
                                                >
                                                    {deletingId ===
                                                    subscriber._id
                                                        ? "..."
                                                        : "Remove"}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Note */}
                <p className="mt-5 text-[9px] leading-5 text-gray-400">
                    Subscriber information is stored securely
                    in your MongoDB database. Keep this dashboard
                    restricted to authorized Morven administrators.
                </p>
            </div>
        </main>
    );
};

export default NewsletterSubscribersPage;