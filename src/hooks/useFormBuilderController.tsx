import { useRef } from "react";
import { FormBuilder, FormBuilderHandle } from "../components";
import { FormDTO } from "../types";

type FormBuilderControllerProps = {
    dto: FormDTO;
    locale: string;
    renderers?: Record<string, React.ComponentType<any>>;
    handleChangeCallback?: (id: string, val: any) => void;
};

export const useFormBuilderController = (props: FormBuilderControllerProps) => {
    const formRef = useRef<FormBuilderHandle>(null);
    const { dto, locale, renderers, handleChangeCallback } = props;

    return {
        getValues: () => formRef.current?.getValues() ?? {},
        getErrors: () => formRef.current?.getErrors() ?? {},
        validateAll: () => formRef.current?.validateAll() ?? {},
        validateField: (id: string) => formRef.current?.validateField(id) ?? [],
        handleChange: (id: string, val: any) =>
            formRef.current?.handleChange?.(id, val),
        Form: () => (
            <FormBuilder
                ref={formRef}
                dto={dto}
                locale={locale}
                renderers={renderers}
                handleChangeCallback={handleChangeCallback}
            />
        ),
    };
};
