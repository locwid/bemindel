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
  postgresUrl: z
    .string()
    .min(1, 'PostgreSQL URL is required')
    .url('Please enter a valid PostgreSQL URL')
    .refine(
      (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
      'URL must start with postgresql:// or postgres://',
    ),
})

type FormValues = z.infer<typeof schema>

interface PropsDatabaseForm {
  className?: string
}

export const DatabaseForm: React.FC<PropsDatabaseForm> = ({ className }) => {
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

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      postgresUrl: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    setupMutation.mutate(values)
  }

  return (
    <Card className={cn('w-full max-w-md', className)}>
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
  )
}
