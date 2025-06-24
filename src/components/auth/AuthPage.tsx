
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sanitizeInput } from '@/utils/security';
import { Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const { signIn, signUp, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(loginData.email)) {
      return;
    }
    
    if (!validatePassword(loginData.password)) {
      return;
    }

    const sanitizedEmail = sanitizeInput(loginData.email, 255);
    await signIn(sanitizedEmail, loginData.password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(signupData.email)) {
      return;
    }
    
    if (!validatePassword(signupData.password)) {
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      return;
    }

    const sanitizedData = {
      email: sanitizeInput(signupData.email, 255),
      firstName: sanitizeInput(signupData.firstName, 50),
      lastName: sanitizeInput(signupData.lastName, 50)
    };

    await signUp(
      sanitizedData.email, 
      signupData.password,
      {
        first_name: sanitizedData.firstName,
        last_name: sanitizedData.lastName
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Centro fitness MUV
          </CardTitle>
          <p className="text-gray-300">Accedi al tuo account</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="login" className="text-gray-300 data-[state=active]:text-white">
                Accedi
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-300 data-[state=active]:text-white">
                Registrati
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="La tua email"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ 
                        ...prev, 
                        password: e.target.value 
                      }))}
                      className="bg-gray-700 border-gray-600 text-white pr-10"
                      placeholder="La tua password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Accesso in corso..." : "Accedi"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Nome
                    </label>
                    <Input
                      type="text"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData(prev => ({ 
                        ...prev, 
                        firstName: e.target.value 
                      }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Nome"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Cognome
                    </label>
                    <Input
                      type="text"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData(prev => ({ 
                        ...prev, 
                        lastName: e.target.value 
                      }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Cognome"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ 
                      ...prev, 
                      email: e.target.value 
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="La tua email"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password (minimo 8 caratteri)
                  </label>
                  <Input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ 
                      ...prev, 
                      password: e.target.value 
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Crea una password"
                    minLength={8}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Conferma Password
                  </label>
                  <Input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ 
                      ...prev, 
                      confirmPassword: e.target.value 
                    }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Conferma la password"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Registrazione in corso..." : "Registrati"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
