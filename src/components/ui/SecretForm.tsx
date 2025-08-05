import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface SecretFormProps {
  name: string;
  onSubmit: (value: string) => void;
}

export const SecretForm: React.FC<SecretFormProps> = ({ name, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configura {name}</CardTitle>
        <CardDescription>
          Inserisci la tua chiave API per continuare
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor={name}>{name}</Label>
            <Input
              id={name}
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Inserisci la tua chiave API"
            />
          </div>
          <Button type="submit" className="w-full">
            Salva
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};