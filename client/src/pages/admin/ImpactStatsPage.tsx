import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ColorInput } from '@/components/ui/color-input';
import AdminHeader from '@/components/admin/AdminHeader';
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ImpactStat {
  id: number;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  order_index: number;
  updated_at: string;
  updated_by?: number;
}

const ImpactStatsPage = () => {
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form state
  const [formValue, setFormValue] = useState<number>(0);
  const [formSuffix, setFormSuffix] = useState<string>('+');
  const [formLabel, setFormLabel] = useState<string>('');
  const [formColor, setFormColor] = useState<string>('#E96D1F');
  
  // Check if token is available
  useEffect(() => {
    if (!token) {
      console.warn('No authentication token found. Please log in again.');
      toast({
        title: 'Authentication Error',
        description: 'You need to be logged in to manage impact stats.',
        variant: 'destructive',
      });
    } else {
      console.log('Authentication token is available:', !!token);
    }
  }, [token, toast]);
  
  // Fetch all impact stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use JWT token from local storage as fallback 
        const jwtToken = token || localStorage.getItem('cms-jwt');
        
        if (!jwtToken) {
          console.warn('No auth token available for fetching impact stats');
        }
        
        const response = await fetch('/api/impact-stats', {
          headers: jwtToken ? {
            'Authorization': `Bearer ${jwtToken}`
          } : {}
        });
        
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        } else {
          toast({
            title: 'Error',
            description: data.message || 'Failed to fetch impact stats',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching impact stats:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch impact stats',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [token, toast]);
  
  // Reset form
  const resetForm = () => {
    setFormValue(0);
    setFormSuffix('+');
    setFormLabel('');
    setFormColor('#E96D1F');
    setEditingId(null);
  };
  
  // Open edit dialog
  const handleEdit = (stat: ImpactStat) => {
    setFormValue(stat.value);
    setFormSuffix(stat.suffix || '+');
    setFormLabel(stat.label);
    setFormColor(stat.color);
    setEditingId(stat.id);
    setIsEditing(true);
  };
  
  // Get auth token with fallback
  const getAuthToken = () => {
    return token || localStorage.getItem('cms-jwt');
  };
  
  // Create new stat
  const handleCreate = async () => {
    try {
      if (!formLabel) {
        toast({
          title: 'Validation Error',
          description: 'Label is required',
          variant: 'destructive',
        });
        return;
      }
      
      const jwtToken = getAuthToken();
      
      if (!jwtToken) {
        toast({
          title: 'Authentication Error',
          description: 'You need to be logged in to create impact stats',
          variant: 'destructive',
        });
        return;
      }
      
      const response = await fetch('/api/impact-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          value: formValue,
          suffix: formSuffix,
          label: formLabel,
          color: formColor,
          order_index: stats.length
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Impact stat created successfully',
        });
        
        setStats([...stats, data.data]);
        setIsCreating(false);
        resetForm();
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to create impact stat',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating impact stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to create impact stat',
        variant: 'destructive',
      });
    }
  };
  
  // Update existing stat
  const handleUpdate = async () => {
    try {
      if (!formLabel) {
        toast({
          title: 'Validation Error',
          description: 'Label is required',
          variant: 'destructive',
        });
        return;
      }
      
      const jwtToken = getAuthToken();
      
      if (!jwtToken) {
        toast({
          title: 'Authentication Error',
          description: 'You need to be logged in to update impact stats',
          variant: 'destructive',
        });
        return;
      }
      
      console.log('Using token for update:', jwtToken ? 'Token available' : 'No token');
      
      const response = await fetch(`/api/impact-stats/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          value: formValue,
          suffix: formSuffix,
          label: formLabel,
          color: formColor
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Impact stat updated successfully',
        });
        
        setStats(stats.map(stat => 
          stat.id === editingId ? data.data : stat
        ));
        setIsEditing(false);
        resetForm();
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update impact stat',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating impact stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to update impact stat',
        variant: 'destructive',
      });
    }
  };
  
  // Delete stat
  const handleDelete = async (id: number) => {
    try {
      if (!confirm('Are you sure you want to delete this impact stat?')) {
        return;
      }
      
      const jwtToken = getAuthToken();
      
      if (!jwtToken) {
        toast({
          title: 'Authentication Error',
          description: 'You need to be logged in to delete impact stats',
          variant: 'destructive',
        });
        return;
      }
      
      const response = await fetch(`/api/impact-stats/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Impact stat deleted successfully',
        });
        
        setStats(stats.filter(stat => stat.id !== id));
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to delete impact stat',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting impact stat:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete impact stat',
        variant: 'destructive',
      });
    }
  };
  
  // Move stat up (decrease order_index)
  const handleMoveUp = async (stat: ImpactStat, index: number) => {
    if (index === 0) return; // Already first
    
    try {
      const jwtToken = getAuthToken();
      
      if (!jwtToken) {
        toast({
          title: 'Authentication Error',
          description: 'You need to be logged in to reorder impact stats',
          variant: 'destructive',
        });
        return;
      }
      
      const prevStat = stats[index - 1];
      const newOrder = prevStat.order_index;
      
      // Update current stat
      const response = await fetch(`/api/impact-stats/${stat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          order_index: newOrder
        })
      });
      
      // Update previous stat
      const responsePrev = await fetch(`/api/impact-stats/${prevStat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          order_index: stat.order_index
        })
      });
      
      const data = await response.json();
      const dataPrev = await responsePrev.json();
      
      if (data.success && dataPrev.success) {
        toast({
          title: 'Success',
          description: 'Impact stat order updated',
        });
        
        // Update local state
        const newStats = [...stats];
        [newStats[index - 1], newStats[index]] = [newStats[index], newStats[index - 1]];
        setStats(newStats);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update impact stat order',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating impact stat order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update impact stat order',
        variant: 'destructive',
      });
    }
  };
  
  // Move stat down (increase order_index)
  const handleMoveDown = async (stat: ImpactStat, index: number) => {
    if (index === stats.length - 1) return; // Already last
    
    try {
      const jwtToken = getAuthToken();
      
      if (!jwtToken) {
        toast({
          title: 'Authentication Error',
          description: 'You need to be logged in to reorder impact stats',
          variant: 'destructive',
        });
        return;
      }
      
      const nextStat = stats[index + 1];
      const newOrder = nextStat.order_index;
      
      // Update current stat
      const response = await fetch(`/api/impact-stats/${stat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          order_index: newOrder
        })
      });
      
      // Update next stat
      const responseNext = await fetch(`/api/impact-stats/${nextStat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          order_index: stat.order_index
        })
      });
      
      const data = await response.json();
      const dataNext = await responseNext.json();
      
      if (data.success && dataNext.success) {
        toast({
          title: 'Success',
          description: 'Impact stat order updated',
        });
        
        // Update local state
        const newStats = [...stats];
        [newStats[index], newStats[index + 1]] = [newStats[index + 1], newStats[index]];
        setStats(newStats);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update impact stat order',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating impact stat order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update impact stat order',
        variant: 'destructive',
      });
    }
  };
  
  // Preview color
  const previewColor = (color: string) => {
    return (
      <div 
        className="w-6 h-6 rounded-full mr-2 inline-block" 
        style={{ backgroundColor: color }}
      ></div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <AdminHeader title="Impact Statistics" />
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Global Impact Statistics</CardTitle>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Stat
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Order</TableHead>
                  <TableHead className="w-[100px]">Value</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead className="w-[100px]">Color</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No impact statistics found. Create your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.map((stat, index) => (
                    <TableRow key={stat.id}>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveUp(stat, index)}
                            disabled={index === 0}
                            className="h-6 w-6"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <span>{index + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveDown(stat, index)}
                            disabled={index === stats.length - 1}
                            className="h-6 w-6"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {stat.value}{stat.suffix || ''}
                      </TableCell>
                      <TableCell>{stat.label}</TableCell>
                      <TableCell>
                        {previewColor(stat.color)}
                        <span className="text-xs text-gray-500">{stat.color}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(stat)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(stat.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Create Dialog */}
      <Dialog open={isCreating} onOpenChange={(open) => {
        if (!open) {
          setIsCreating(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Impact Stat</DialogTitle>
            <DialogDescription>
              Add a new statistic to showcase your global impact
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Value*</Label>
                <Input
                  id="value"
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  placeholder="e.g. +, %, k"
                  value={formSuffix}
                  onChange={(e) => setFormSuffix(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="label">Label*</Label>
              <Input
                id="label"
                placeholder="e.g. Years of Experience"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-md"
                  style={{ backgroundColor: formColor }}
                ></div>
                <Input
                  id="color"
                  placeholder="#E96D1F"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleCreate}>
                Create Stat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={(open) => {
        if (!open) {
          setIsEditing(false);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Impact Stat</DialogTitle>
            <DialogDescription>
              Update this statistic to showcase your global impact
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value-edit">Value*</Label>
                <Input
                  id="value-edit"
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="suffix-edit">Suffix</Label>
                <Input
                  id="suffix-edit"
                  placeholder="e.g. +, %, k"
                  value={formSuffix}
                  onChange={(e) => setFormSuffix(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="label-edit">Label*</Label>
              <Input
                id="label-edit"
                placeholder="e.g. Years of Experience"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="color-edit">Color</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-md"
                  style={{ backgroundColor: formColor }}
                ></div>
                <Input
                  id="color-edit"
                  placeholder="#E96D1F"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleUpdate}>
                Update Stat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImpactStatsPage; 