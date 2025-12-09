import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import RichTextEditor from './RichTextEditor';
import BlockTemplates from './BlockTemplates';
import { Plus, X, ArrowUp, ArrowDown, ImageIcon, Heading, AlignLeft, Box as BoxIcon, Layout } from 'lucide-react';

// Define content block types
type BlockType = 'text' | 'image' | 'cta' | 'separator' | 'html';

interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  settings?: Record<string, any>;
}

interface SectionEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export default function SectionEditor({ initialContent, onChange }: SectionEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('content');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  // Parse initial content if available
  useEffect(() => {
    if (initialContent) {
      try {
        const parsedContent = JSON.parse(initialContent);
        if (Array.isArray(parsedContent)) {
          setBlocks(parsedContent);
        } else if (typeof initialContent === 'string' && initialContent.trim().length > 0) {
          // Add as a single text block if it's just a string
          setBlocks([
            { id: generateId(), type: 'text', content: initialContent }
          ]);
        }
      } catch (e) {
        // If not valid JSON, treat as plain text
        if (initialContent.trim().length > 0) {
          setBlocks([
            { id: generateId(), type: 'text', content: initialContent }
          ]);
        }
      }
    }
  }, [initialContent]);

  // Update parent component when blocks change
  useEffect(() => {
    try {
      const contentJson = JSON.stringify(blocks);
      onChange(contentJson);
    } catch (e) {
      console.error('Failed to stringify blocks:', e);
    }
  }, [blocks, onChange]);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addBlock = (type: BlockType) => {
    let newBlock: ContentBlock = {
      id: generateId(),
      type,
      content: ''
    };

    if (type === 'cta') {
      newBlock.content = 'Call to Action';
      newBlock.settings = {
        buttonText: 'Learn More',
        buttonUrl: '#',
        buttonStyle: 'primary'
      };
    }

    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    setBlocks(newBlocks);
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    setBlocks(newBlocks);
  };
  
  // Handle drag and drop rearrangement
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('blockIndex', index.toString());
    e.currentTarget.classList.add('opacity-50');
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-100');
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-100');
  };
  
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-100');
    
    const sourceIndex = parseInt(e.dataTransfer.getData('blockIndex'));
    if (sourceIndex === targetIndex) return;
    
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(sourceIndex, 1);
    newBlocks.splice(targetIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const updateBlockSettings = (id: string, settings: Record<string, any>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, settings: { ...block.settings, ...settings } } : block
    ));
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="mb-4">
            <RichTextEditor 
              value={block.content} 
              onChange={(content) => updateBlockContent(block.id, content)}
              placeholder="Type text content here..."
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="mb-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`img-url-${block.id}`}>Image URL</Label>
              <Input 
                id={`img-url-${block.id}`}
                value={block.content} 
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                placeholder="Enter image URL..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`img-alt-${block.id}`}>Alt Text</Label>
              <Input 
                id={`img-alt-${block.id}`}
                value={block.settings?.altText || ''} 
                onChange={(e) => updateBlockSettings(block.id, { altText: e.target.value })}
                placeholder="Describe the image..."
              />
            </div>
            {block.content && (
              <div className="mt-2 border rounded p-2">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img 
                  src={block.content} 
                  alt={block.settings?.altText || 'Preview'} 
                  className="max-h-[200px] max-w-full object-contain"
                />
              </div>
            )}
          </div>
        );
        
      case 'cta':
        return (
          <div className="mb-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`cta-text-${block.id}`}>CTA Text</Label>
              <Input 
                id={`cta-text-${block.id}`}
                value={block.content} 
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                placeholder="Call to action text..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`button-text-${block.id}`}>Button Text</Label>
              <Input 
                id={`button-text-${block.id}`}
                value={block.settings?.buttonText || 'Learn More'} 
                onChange={(e) => updateBlockSettings(block.id, { buttonText: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`button-url-${block.id}`}>Button URL</Label>
              <Input 
                id={`button-url-${block.id}`}
                value={block.settings?.buttonUrl || '#'} 
                onChange={(e) => updateBlockSettings(block.id, { buttonUrl: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Button Style</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={block.settings?.buttonStyle === 'primary' ? 'default' : 'outline'}
                  onClick={() => updateBlockSettings(block.id, { buttonStyle: 'primary' })}
                  className="flex-1"
                >
                  Primary
                </Button>
                <Button
                  type="button"
                  variant={block.settings?.buttonStyle === 'secondary' ? 'default' : 'outline'}
                  onClick={() => updateBlockSettings(block.id, { buttonStyle: 'secondary' })}
                  className="flex-1"
                >
                  Secondary
                </Button>
                <Button
                  type="button"
                  variant={block.settings?.buttonStyle === 'link' ? 'default' : 'outline'}
                  onClick={() => updateBlockSettings(block.id, { buttonStyle: 'link' })}
                  className="flex-1"
                >
                  Link
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'separator':
        return (
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Horizontal separator line</p>
            <div className="border-t-2 border-gray-200 my-4"></div>
          </div>
        );
        
      case 'html':
        return (
          <div className="mb-4 space-y-2">
            <Label htmlFor={`html-${block.id}`}>Custom HTML</Label>
            <textarea
              id={`html-${block.id}`}
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
              className="w-full min-h-[200px] border rounded p-2 font-mono text-sm"
              placeholder="<div>Your custom HTML here</div>"
            />
          </div>
        );
      
      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <Tabs defaultValue="blocks" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="blocks">Basic Blocks</TabsTrigger>
              <TabsTrigger value="templates">Layout Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('text')}
                  className="flex items-center"
                >
                  <AlignLeft className="w-4 h-4 mr-1" />
                  Add Text
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('image')}
                  className="flex items-center"
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('cta')}
                  className="flex items-center"
                >
                  <BoxIcon className="w-4 h-4 mr-1" />
                  Add CTA
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('separator')}
                  className="flex items-center"
                >
                  <Heading className="w-4 h-4 mr-1" />
                  Add Separator
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addBlock('html')}
                  className="flex items-center"
                >
                  <BoxIcon className="w-4 h-4 mr-1" />
                  Add HTML
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="templates">
              <BlockTemplates 
                onSelect={(templateBlocks) => {
                  // Add all blocks from the template
                  const blocksWithIds = templateBlocks.map((block: any) => ({
                    ...block,
                    id: generateId()
                  }));
                  setBlocks([...blocks, ...blocksWithIds]);
                }} 
              />
            </TabsContent>
          </Tabs>
          
          {blocks.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500 mb-4">No content blocks added yet</p>
              <Button 
                type="button" 
                onClick={() => addBlock('text')}
                className="flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Content Block
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <Card 
                  key={block.id} 
                  className="relative cursor-move hover:shadow-md transition-all"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute right-2 top-2 flex space-x-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => moveBlockUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => moveBlockDown(index)}
                      disabled={index === blocks.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => removeBlock(block.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute left-2 top-2 bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-medium">
                    Drag to reorder
                  </div>
                  <CardContent className="pt-10">
                    <div className="text-xs uppercase font-medium text-gray-500 mb-2">
                      {block.type} block
                    </div>
                    {renderBlockEditor(block, index)}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="preview" className="bg-white rounded-md border p-4">
          <div className="prose prose-sm max-w-none">
            {blocks.map((block, index) => {
              switch (block.type) {
                case 'text':
                  return (
                    <div key={block.id} dangerouslySetInnerHTML={{ __html: block.content }} />
                  );
                
                case 'image':
                  return (
                    <div key={block.id} className="my-4">
                      {block.content ? (
                        <img 
                          src={block.content} 
                          alt={block.settings?.altText || ''} 
                          className="max-w-full"
                        />
                      ) : (
                        <div className="bg-gray-100 p-4 text-center text-gray-500">
                          Image placeholder (No URL provided)
                        </div>
                      )}
                    </div>
                  );
                
                case 'cta':
                  return (
                    <div key={block.id} className="my-4 p-4 bg-gray-50 rounded-md text-center">
                      <p className="mb-3">{block.content}</p>
                      <Button 
                        variant={block.settings?.buttonStyle === 'secondary' ? 'outline' : 
                                 block.settings?.buttonStyle === 'link' ? 'link' : 'default'}
                      >
                        {block.settings?.buttonText || 'Learn More'}
                      </Button>
                    </div>
                  );
                
                case 'separator':
                  return <hr key={block.id} className="my-4" />;
                
                case 'html':
                  return (
                    <div 
                      key={block.id} 
                      dangerouslySetInnerHTML={{ __html: block.content }} 
                      className="my-4"
                    />
                  );
                
                default:
                  return null;
              }
            })}
            
            {blocks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No content to preview. Add content blocks in the Content tab.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}