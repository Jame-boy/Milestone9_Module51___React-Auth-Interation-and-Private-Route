import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import uuuuu from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    console.log(loading);
    if (loading) {
        //!https://daisyui.com/components/loading/
        return (
            <>
                <span className="loading loading-spinner loading-xs"></span>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="loading loading-spinner loading-md"></span>
                <span className="loading loading-spinner loading-lg"></span>
            </>
        );
    }

    console.log(loading);

    if (user) {
        return children;
    }

    //! https://reactrouter.com/en/6.22.3/components/navigate
    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: uuuuu.node,
};
