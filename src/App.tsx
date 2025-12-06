import { FormBuilder, type FormBuilderHandle } from "./components/FormBuilder";
import { profileForm } from "../src/examples/profileForm";
import { Button } from "@mui/material";
import { useRef } from "react";

function App() {
    const formRef = useRef<FormBuilderHandle>(null);

    const handleSave = (e: any) => {
        e.preventDefault();
        if (!formRef.current) return;
        const values = formRef.current.getValues();
        const errors = formRef.current.validateAll();
        console.log("Values:", values);
        console.log("Errors:", errors);
    };

    return (
        <div
            style={{
                margin: "auto",
                padding: "1rem",
            }}
        >
            <form onSubmit={handleSave}>
                <FormBuilder ref={formRef} dto={profileForm} />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default App;
