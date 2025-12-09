import { useState, useEffect, FormEvent } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SocialLink {
  name?: string;
  url?: string;
  icon?: string;
}

interface FooterData {
  id?: number;
  company_description?: string;
  address?: string;
  phone?: string;
  email?: string;
  social_links: SocialLink[];
  copyright_text?: string;
  privacy_link?: string;
  terms_link?: string;
  sitemap_link?: string;
}

const FooterSettingsPage = () => {
  const { toast } = useToast();
  const { user, token } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [footerData, setFooterData] = useState<FooterData>({
    company_description: '',
    address: '',
    phone: '',
    email: '',
    social_links: [],
    copyright_text: '',
    privacy_link: '#',
    terms_link: '#',
    sitemap_link: '#'
  });
  
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/footer');
        const data = await response.json();
        
        if (data.success && data.data) {
          setFooterData(data.data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load footer settings',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFooterData();
  }, [toast]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user || !token) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to update footer settings',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/footer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(footerData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Footer settings updated successfully'
        });
        setFooterData(result.data);
      } else {
        throw new Error(result.message || 'Failed to update footer settings');
      }
    } catch (error) {
      console.error('Error saving footer settings:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update footer settings',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAddSocialLink = () => {
    setFooterData(prev => ({
      ...prev,
      social_links: [
        ...prev.social_links,
        { name: '', url: '', icon: '' }
      ]
    }));
  };
  
  const handleRemoveSocialLink = (index: number) => {
    setFooterData(prev => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index)
    }));
  };
  
  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    setFooterData(prev => {
      const updatedLinks = [...prev.social_links];
      updatedLinks[index] = {
        ...updatedLinks[index],
        [field]: value
      };
      return {
        ...prev,
        social_links: updatedLinks
      };
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading footer settings...</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <AdminHeader title="Footer Settings" description="Manage footer content displayed on your website" />
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-8" noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update the company information displayed in the footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_description">Company Description</Label>
              <Textarea 
                id="company_description" 
                value={footerData.company_description || ''} 
                onChange={(e) => setFooterData({ ...footerData, company_description: e.target.value })}
                placeholder="Enter company description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                value={footerData.address || ''} 
                onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                placeholder="Enter company address"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Use commas to separate address lines.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="text" 
                  value={footerData.phone || ''} 
                  onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={footerData.email || ''} 
                  onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Manage social media links in the footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerData.social_links.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`social-name-${index}`}>Platform Name</Label>
                  <Input 
                    id={`social-name-${index}`} 
                    value={link.name || ''} 
                    onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                    placeholder="e.g. LinkedIn"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`social-url-${index}`}>URL</Label>
                  <Input 
                    id={`social-url-${index}`} 
                    value={link.url || ''} 
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`social-icon-${index}`}>Icon Class</Label>
                  <div className="flex gap-2">
                    <Input 
                      id={`social-icon-${index}`} 
                      value={link.icon || ''} 
                      onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                      placeholder="fab fa-linkedin"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveSocialLink(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Use Font Awesome classes (e.g. fab fa-linkedin)</p>
                </div>
              </div>
            ))}
            
            <Button type="button" variant="outline" className="w-full" onClick={handleAddSocialLink}>
              <Plus className="h-4 w-4 mr-2" /> Add Social Link
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Copyright & Legal</CardTitle>
            <CardDescription>Update copyright text and legal links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="copyright_text">Copyright Text</Label>
              <Input 
                id="copyright_text" 
                value={footerData.copyright_text || ''} 
                onChange={(e) => setFooterData({ ...footerData, copyright_text: e.target.value })}
                placeholder="PACT Consultancy. All rights reserved."
              />
              <p className="text-xs text-muted-foreground">The year will be added automatically.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="privacy_link">Privacy Policy URL</Label>
                <Input 
                  id="privacy_link" 
                  value={footerData.privacy_link} 
                  onChange={(e) => setFooterData({ ...footerData, privacy_link: e.target.value })}
                  placeholder="#"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="terms_link">Terms of Service URL</Label>
                <Input 
                  id="terms_link" 
                  value={footerData.terms_link} 
                  onChange={(e) => setFooterData({ ...footerData, terms_link: e.target.value })}
                  placeholder="#"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sitemap_link">Sitemap URL</Label>
                <Input 
                  id="sitemap_link" 
                  value={footerData.sitemap_link} 
                  onChange={(e) => setFooterData({ ...footerData, sitemap_link: e.target.value })}
                  placeholder="#"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FooterSettingsPage; 