import {useGetMeOrderQuery} from "@/redux/features/order/orderApi";
import LoadingProgress from "@/pages/shared/LoadingProgress";
import { TOrders } from "@/pages/types/order.type";
import { useState } from "react";



const OrderManageCustomer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: orderMeData, isLoading, isError } = useGetMeOrderQuery(undefined);
    // console.log(orderMeData);

    const totalMyOrder = orderMeData?.data?.meta?.total;
    const orders = orderMeData?.data?.result;
    const limit = orderMeData?.data?.meta?.limit;
    const totalPage = orderMeData?.data?.meta?.totalPage;

    if (isLoading) {
        return <LoadingProgress />;
    }

    if (isError) {
        return <div>Data no fetch</div>;
    }

    // Date formeting function
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <section className="container px-4 mx-auto">

                <div className="flex items-center justify-center gap-3 ">
                    <h2 className=" font-medium text-gray-800 dark:text-white text-3xl">All My Orders</h2>
                    <span className="px-2 mb-6 text-lg border-blue-500 border-2  rounded-full "> {totalMyOrder}</span>
                </div>

                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    {/* Table Header */}
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            {/* SL */}
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                SL
                                            </th>

                                            {/* Order-Created */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Order-Created
                                            </th>

                                            {/* Order-Status */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            {/* Transection Id */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Transection Id
                                            </th>

                                            {/* Product Details */}
                                            {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                                                Products
                                            </th> */}

                                            {/* Total-Price */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Total-Price
                                            </th>

                                            {/* Action */}
                                            {/* <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                                                Action
                                            </th> */}
                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            orders?.length > 0 ?
                                                (orders?.map((or: TOrders, index: number) => {
                                                    const globalIndex = (currentPage - 1) * limit + index;
                                                    return (
                                                        <tr key={or?._id}>
                                                            {/* SL */}
                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                {globalIndex + 1}
                                                            </td>

                                                            {/* Order-Created */}
                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {formatDate(or?.createdAt)}
                                                            </td>


                                                            {/* Order-Status */}
                                                            <td className="px-4 py-4 text-sm text-blue-500 dark:text-gray-300 whitespace-nowrap">
                                                                {or?.status}
                                                            </td>

                                                            {/* Order-Status */}
                                                            <td className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">
                                                                {or?.transaction?.id}
                                                            </td>


                                                            {/* Product Details */}
                                                            {/* <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr>
                                                                    <th className=" px-4 py-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                                        Name
                                                                    </th>
                                                                    <th className="px-4 py-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                                        Quantity
                                                                    </th>
                                                                    <th className="px-4 py-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                                                        Unit Price
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {or.products.map((product, productIndex) => (
                                                                    <tr key={productIndex}>
                                                                        <td className="px-4 py-2 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            {product.product}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            {product.quantity}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            {product.product.price} TK
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td> */}

                                                            {/* Total-Price */}
                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {or?.totalPrice} TK
                                                            </td>

                                                            {/* Action */}
                                                            {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center justify-center gap-x-6">
                                                            <button
                                                                onClick={() => handleDeleteProduct(or)}
                                                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td> */}
                                                        </tr>
                                                    );
                                                })) :
                                                (
                                                    <tr>
                                                        <td colSpan={7} className="text-center py-4 text-gray-600">
                                                            No available data
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 mb-10">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Previous</span>
                    </button>

                    <div className="items-center hidden md:flex gap-x-3">
                        {Array.from({ length: totalPage }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-2 py-1 text-sm ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'} rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPage}
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default OrderManageCustomer;