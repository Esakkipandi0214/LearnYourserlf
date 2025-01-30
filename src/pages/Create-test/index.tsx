import TestCreator from "@/components/Testprops/TestCreator"
import { useEffect, useState } from "react"
import Layout from "@/components/LayoutComponents/Layout";
import Cookies from "js-cookie";
const Index = () => {
    const [createdBy, setCreatedBy] = useState("") // This would typically come from your auth system
    
    
    useEffect(() => {
        const updateUserId = async () => {
            const userId =  Cookies.get("userId_LearnYourSelf")
            if (userId) {
                setCreatedBy(userId)
            }
        }

        if (!createdBy) {
            updateUserId()
        }
    }, [createdBy])

    
    console.log("createdBy:",createdBy);
    
    return (
        <Layout>
        <div className="container ">
            <TestCreator createdBy={createdBy}  />
        </div>
        </Layout>
    )
}

export default Index
