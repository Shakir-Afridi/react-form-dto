import { FormBuilder } from "@components/FormBuilder";
import { profileForm } from "../src/examples/profileForm";
import { Button } from "@mui/material";

function App() {
    return (
        <div
            style={{
                margin: "auto",
                padding: "1rem",
            }}
        >
            <form onSubmit={(e) => console.log(e)}>
                <FormBuilder dto={profileForm} />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default App;
