import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/custom/PasswordInput';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

type LogInSchema = z.infer<typeof schema>;

export default function LogIn() {
	const form = useForm<LogInSchema>({
		defaultValues: { email: '', password: '' },
		resolver: zodResolver(schema),
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LogInSchema> = (data) => {
		console.log(data);
		navigate('/');
	};

	return (
		<Card className='max-w-sm mx-auto'>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl font-bold'>Log In</CardTitle>
				<CardDescription>
					Enter your email and password to login to your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						className='space-y-6'
						onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='example@example.com'
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
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
				</Form>
			</CardContent>

			<CardFooter>
				<p className='text-sm text-center'>
					Don't have an account?{' '}
					<Link to='/register'>
						<Button variant='link' size='sm' className='pl-0'>
							Register
						</Button>
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
