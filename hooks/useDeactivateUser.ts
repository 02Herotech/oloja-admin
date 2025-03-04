import {useDeactivateUserMutation} from "@/services/users";


export const useDeactivateUser = () => {
    const [deactivateUser, { isLoading }] = useDeactivateUserMutation();

    const deactivateUserHandler = async (userId: number) => {
        try {
            await deactivateUser(userId).unwrap();
        } catch (error) {
            console.error("Failed to deactivate user:", error);
            alert('Failed to deactivate user');
        }
    };

    return { deactivateUserHandler, isLoading };
};