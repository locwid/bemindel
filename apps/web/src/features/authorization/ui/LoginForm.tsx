import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router'
import { authClient } from '@/shared/api'
import { Button } from '@/shared/ui/kit/Button'
import { Input } from '@/shared/ui/kit/Input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/Form'
import { cn } from '@/shared/ui/lib'
import { useMutation } from '@tanstack/react-query'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface PropsLoginForm {
  className?: string
}

export const LoginForm: React.FC<PropsLoginForm> = ({ className }) => {
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginFormValues) => {
      await authClient.signIn.email({
        email,
        password,
      })
    },
    onSuccess: () => {
      navigate('/')
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    mutation.mutate(values)
  }

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-2xl font-bold'>
          Welcome back
        </CardTitle>
        <CardDescription className='text-center'>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      type='email'
                      autoComplete='email'
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
                      placeholder='Enter your password'
                      type='password'
                      autoComplete='current-password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!!mutation.error && (
              <div className='text-destructive bg-destructive/10 rounded-md p-3 text-center text-sm'>
                {mutation.error.message || 'An unexpected error occurred'}
              </div>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
