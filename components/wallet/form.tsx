import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface FormFieldComponentProps {
    fieldName: string;
    label: string;
    placeholder?: string;
    type?: string;
    isSelect?: boolean;
    options?: { value: string; label: string }[];
}

const FormFieldComponent: React.FC<FormFieldComponentProps> = ({
    fieldName,
    label,
    placeholder = "",
    type = "text",
    isSelect = false,
    options = [],
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={fieldName}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {!isSelect ? (
                            <Input
                                placeholder={placeholder}
                                {...field}
                                type={type}
                            />
                        ) : (
                            <Select
                                placeholder={placeholder || "Select an option"}
                                value={field.value}
                                onChange={field.onChange}
                                options={options}
                                className='my-3 cursor-pointer'
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldComponent;