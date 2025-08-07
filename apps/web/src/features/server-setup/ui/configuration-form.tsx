import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/ui/kit/button'
import { Input } from '@/shared/ui/kit/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form'
import { useMutation } from '@tanstack/react-query'
import { orpc, queryClient } from '@/shared/api'
import { cn } from '@/shared/ui/lib'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password must not exceed 128 characters'),
})

type FormValues = z.infer<typeof schema>

interface PropsConfigurationForm {
  className?: string
}

export const ConfigurationForm: React.FC<PropsConfigurationForm> = ({
  className,
}) => {
  const mutation = useMutation(
    orpc.setupServer.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.healthCheck.key(),
        })
      },
    }),
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Card className={cn('w-full max-w-lg', className)}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-2xl font-bold'>
          Application Setup
        </CardTitle>
        <CardDescription className='text-center'>
          Configure your application to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <fieldset className='border-accent space-y-4 border p-4'>
              <legend className='mb-0 text-lg font-semibold'>
                Admin user configuration
              </legend>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='admin'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='example@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='not123456'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            {!!mutation.error && (
              <div className='text-destructive bg-destructive/10 rounded-md p-3 text-center text-sm'>
                {mutation.error.message ||
                  'An unexpected error occurred during setup'}
              </div>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Setting up...' : 'Setup'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
