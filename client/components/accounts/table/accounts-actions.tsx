import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { RiMoreLine} from "react-icons/ri";
import { Account } from '~/model/types';
import { useDeleteAccountMutation } from '~/api/mutation/useDeleteAccountMutation';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "~/components/ui/dialog"
  import { Label } from '~/components/ui/label';
  import { Input } from '~/components/ui/input';
import { Flex } from '~/components/generic/flex';
import { useEditAccountMutation } from '~/api/mutation/useEditAccountMutation';
import { useAccountForm } from '~/hooks/accounts/useAccountForm';
import { FormFieldWrapper } from '~/components/generic/form/FormFields';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountSchema } from '~/model/schemas';
import { Form } from "../../ui/form";

type AccountsActionsProps = {
  id: Account["_id"];
  name: Account["name"]
};

type EditAmountDialogProps = {
handleActionsClose: () => void;

 
} & AccountsActionsProps;

const EditAccountDialog = ({id,  name, handleActionsClose}: EditAmountDialogProps) => {
    const [open, setOpen] = React.useState(true);
    const [amount, setAmount] = React.useState(0);
    const updateAccount = useEditAccountMutation({onSuccess: () => handleActionsClose()});
    const handleClose = () => {
      setOpen(false);
    };
    const {} = useAccountForm();
    const form = useForm({
      resolver: zodResolver(AccountSchema),
      defaultValues: {name, _id: id,  amount: 0 },
    })
   const onSubmit = (data: Account) => {
    console.log("data", data);
     updateAccount.mutate(data);
   }
    //if success call handleActionsClose
  return (
    <Dialog open={open} >
      <DialogTrigger asChild >
        <Button variant="ghost" onClick={() => setOpen(true)} >Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Edit the amount of {name}</DialogTitle>
         
        </DialogHeader>
        <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)}>


          <Flex gap={4} items='center'>
            <Label htmlFor="name" >
              New amount
            </Label>

            <FormFieldWrapper
              control={form.control}
              name={"amount"}
              label={"Amount"}
              className="flex flex-col"
              renderInput={(field) => (
                <Input {...field} type="number" placeholder="e.g. 100" />
              )}
         />
          </Flex>
         
        <DialogFooter className='gap-2'>
          <Button type='submit'>Save changes</Button>
          <Button type="button" variant={"destructive"} onClick={handleClose}>Cancel</Button>
        </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


export const AccountsActions = ({id, name}: AccountsActionsProps) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    }

    const deleteAccount = useDeleteAccountMutation({onSuccess: () => handleClose()});
  return (

    <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0" onClick={handleOpen}>
              <span className="sr-only">Open menu</span>
              <RiMoreLine className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className='text-center font-medium'>           
            <DropdownMenuItem asChild>
            <EditAccountDialog  name={name} id={id} handleActionsClose={handleClose} />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {deleteAccount.mutate([id])}} >Delete account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    
  )
}
