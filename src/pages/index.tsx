import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
  TextField,
} from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const AUTH_TOKEN = 'fake-user-1-token';

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['user'], async () => {
    const response = await fetch('/api/user', {
      headers: {
        Authorization: `Basic ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  });

  const { mutateAsync: updateUser, isLoading: isUserUpdating } = useMutation(
    async ({ email, name, phone }: { email: string; name: string; phone: string }) => {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Basic ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ email, name, phone }),
      });
      const data = await response.json();

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    },
  );

  const [formData, setFormData] = useState({ email: '', name: '', phone: '' });
  const [error, setError] = useState('');

  const handleNameChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, name: value }));
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await updateUser(formData);
  
      if (response.error) {
        setError(response.error);
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }

  }, [updateUser, formData]);

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        email: data?.user.email || '',
        name: data?.user.name || '',
        phone: data?.user.phone || '',
      });
    }
  }, [isLoading, data]);

  return (
    <Form onSubmit={handleSubmit}>
      <Page title="Home">
        <Layout>
          <Layout.AnnotatedSection
            title="Account details"
            description="Abra will use this as your account information."
          >
            <Card>
              <FormLayout>
                <TextField
                  label="Full name"
                  autoComplete="name"
                  onChange={handleNameChange}
                  value={formData.name}
                />
                <TextField
                  type="email"
                  label="Email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  value={formData.email}
                  error={error}
                />
                <TextField
                  label="Phone"
                  autoComplete="phone"
                  onChange={handlePhoneChange}
                  value={formData.phone}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <PageActions
          primaryAction={
            <Button
              submit
              variant="primary"
              loading={isUserUpdating}
              disabled={isUserUpdating || isLoading}
            >
              Save
            </Button>
          }
        />
      </Page>
    </Form>
  );
}