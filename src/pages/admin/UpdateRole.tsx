


import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UpdateUserModal from "@/components/modal/UpdateUserModal";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useState } from "react";
import { TExtraError } from "@/pages/types/index";

export interface TRole {
    userRole: string;
    userId: string;
    email: string;
}

const UpdateRole = ({ userRole, userId, email }: TRole) => {
    const [updateUser] = useUpdateUserMutation();
    // console.log(updateUser);

    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [isOpen, setIsOpen] = useState(false);

    // Modal handler function
    const modalHandler = async (selectedRole: string) => {
        // Check if currentUser is null
        if (!currentUser) {
            toast.error('You must be logged in to perform this action');
            setIsOpen(false);
            return;
        }

        // Check if the current user is trying to update their own role
        if (currentUser.role === email) {
            toast.error('Action Not Allowed');
            setIsOpen(false);
            return;
        }


        try {
             await updateUser({ userId, body: { role: selectedRole } }).unwrap();
            // console.log("Update Result:", result);
            toast.success('User role updated successfully');
            setIsOpen(false);
        } catch (error) {
            // console.error("Update Error:", error);
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
                <span className='relative'>{userRole}</span>
            </button>
            {/* Update User Modal */}
            <UpdateUserModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalHandler={modalHandler}
                userRole={userRole}
            />
        </>
    );
};

export default UpdateRole;