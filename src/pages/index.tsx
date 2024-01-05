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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleClearField = (fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = useCallback(async () => {
    try {
      const response = await updateUser(formData);
  
      if (response.error) {
        toast.error(response.error, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.success('User updated successfully!', { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error('An error occurred while updating. Please try again.');
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
              <ToastContainer />
              <FormLayout>
                <TextField
                  label="Full name"
                  autoComplete="name"
                  onChange={handleNameChange}
                  value={formData.name || ''}
                />
                <Button onClick={() => handleClearField('name')}>Clear</Button>
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
                  value={formData.phone || ''}
                />
                <Button onClick={() => handleClearField('phone')}>Clear</Button>
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