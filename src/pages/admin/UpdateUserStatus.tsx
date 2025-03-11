import UpdateUserStat from "@/components/modal/UpdateUserState";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { RootState } from "@/redux/store";
import { TExtraError } from "@/pages/types/index";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface TStatus {
    userStatus: string;
    userId: string;
    email: string;
}


const UpdateUserStatus = ({ userStatus, userId, email }: TStatus) => {

    const [updateUser] = useUpdateUserMutation();
    // console.log(updateUser);

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [isOpen, setIsOpen] = useState(false);

    // Modal handler function
    const modalHandler = async (selectedStatus: string) => {
        // Check if currentUser is null
        if (!currentUser) {
            toast.error('You must be logged in to perform this action');
            setIsOpen(false);
            return;
        }

        // Check if the current user is trying to update their own status
        if (currentUser.role === email) {
            toast.error('Action Not Allowed');
            setIsOpen(false);
            return;
        }


        try {
            await updateUser({ userId, body: { status: selectedStatus } }).unwrap();
            // console.log("Update Result:", result);
            toast.success('User status updated successfully');
            setIsOpen(false);
        } catch (error) {
            console.error("Update Error:", error);
            toast.error((error as TExtraError)?.data?.message || 'Failed to delete user');
        }

    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
                <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                ></span>
                <span className='relative'>{userStatus}</span>
            </button>
            {/* Update User Modal */}

            <UpdateUserStat
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalHandler={modalHandler}
                userStatus={userStatus}
            />
        </>
    );
};

export default UpdateUserStatus;