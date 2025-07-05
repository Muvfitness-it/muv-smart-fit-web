
interface ValidationErrors {
  title?: string;
  slug?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
}

export const validateField = (field: string, value: string, currentErrors: ValidationErrors): ValidationErrors => {
  const errors = { ...currentErrors };
  
  switch (field) {
    case 'title':
      if (!value.trim()) {
        errors.title = 'Il titolo è obbligatorio';
      } else if (value.length > 100) {
        errors.title = 'Il titolo deve essere massimo 100 caratteri';
      } else {
        delete errors.title;
      }
      break;
    
    case 'slug':
      if (!value.trim()) {
        errors.slug = 'Lo slug è obbligatorio';
      } else if (!/^[a-z0-9-]+$/.test(value)) {
        errors.slug = 'Lo slug può contenere solo lettere minuscole, numeri e trattini';
      } else {
        delete errors.slug;
      }
      break;
    
    case 'content':
      if (!value.trim()) {
        errors.content = 'Il contenuto è obbligatorio';
      } else if (value.length < 100) {
        errors.content = 'Il contenuto deve essere almeno 100 caratteri';
      } else {
        delete errors.content;
      }
      break;
    
    case 'meta_title':
      if (value.length > 60) {
        errors.meta_title = 'Il titolo SEO deve essere massimo 60 caratteri';
      } else {
        delete errors.meta_title;
      }
      break;
    
    case 'meta_description':
      if (value.length > 160) {
        errors.meta_description = 'La descrizione SEO deve essere massimo 160 caratteri';
      } else {
        delete errors.meta_description;
      }
      break;
  }
  
  return errors;
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};
