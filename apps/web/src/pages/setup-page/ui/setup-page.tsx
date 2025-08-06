import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useNavigate } from 'react-router'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { useMutation } from '@tanstack/react-query'
import { orpc, queryClient } from '@/shared/api'
import { useHealthCheck } from '@/shared/api/health-check'

const setupSchema = z.object({
  postgresUrl: z
    .string()
    .min(1, 'PostgreSQL URL is required')
    .url('Please enter a valid PostgreSQL URL')
    .refine(
      (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
      'URL must start with postgresql:// or postgres://',
    ),
})

type SetupFormValues = z.infer<typeof setupSchema>

export const SetupPage: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = React.useState<string | null>(null)

  const setupMutation = useMutation(
    orpc.setupServer.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.healthCheck.key(),
        })
      },
      onError: (err: any) => {
        setError(err?.message || 'An unexpected error occurred during setup')
      },
    }),
  )

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      postgresUrl: '',
    },
  })

  const onSubmit = async (values: SetupFormValues) => {
    setError(null)
    setupMutation.mutate(values)
  }

  const { setupRequired } = useHealthCheck()

  if (!setupRequired) {
    return <Navigate to='/' />
  }

  return (
    <div className='bg-background flex min-h-screen items-center justify-center px-4'>
      <Card className='mx-auto w-full max-w-md'>
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
              <FormField
                control={form.control}
                name='postgresUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PostgreSQL Connection URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='postgresql://user:password@host:port/database'
                        type='url'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className='text-destructive bg-destructive/10 rounded-md p-3 text-center text-sm'>
                  {error}
                </div>
              )}

              <Button
                type='submit'
                className='w-full'
                disabled={setupMutation.isPending}
              >
                {setupMutation.isPending ? 'Setting up...' : 'Setup'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
