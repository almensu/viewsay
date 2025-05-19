import { parseMarkdown, MarkdownData } from './markdownParser';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9000';

export async function loadScene(sceneId: string): Promise<MarkdownData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scenes/${sceneId}`);
    if (!response.ok) {
      throw new Error(`Failed to load scene: ${response.statusText}`);
    }
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading scene ${sceneId}:`, error);
    throw error;
  }
}

export async function loadContentBlock(blockId: string): Promise<MarkdownData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blocks/${blockId}`);
    if (!response.ok) {
      throw new Error(`Failed to load content block: ${response.statusText}`);
    }
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading content block ${blockId}:`, error);
    throw error;
  }
}

export async function loadStage(stageId: number): Promise<MarkdownData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stages/${stageId}`);
    if (!response.ok) {
      throw new Error(`Failed to load stage: ${response.statusText}`);
    }
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading stage ${stageId}:`, error);
    throw error;
  }
}

export async function listScenes(): Promise<{ id: string; name: string; stageLevelRequirement: number; imageUrl?: string }[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scenes`);
    if (!response.ok) {
      throw new Error(`Failed to list scenes: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Add image URLs to scenes that have visualAsset property
    return data.scenes.map((scene: any) => ({
      id: scene.id,
      name: scene.name,
      stageLevelRequirement: scene.stageLevelRequirement,
      imageUrl: scene.visualAsset ? `${API_BASE_URL}/static/images/${scene.visualAsset}` : undefined
    }));
  } catch (error) {
    console.error('Error listing scenes:', error);
    throw error;
  }
}

export async function listStages(): Promise<{ id: number; name: string; requiredXP: number }[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stages`);
    if (!response.ok) {
      throw new Error(`Failed to list stages: ${response.statusText}`);
    }
    const data = await response.json();
    return data.stages;
  } catch (error) {
    console.error('Error listing stages:', error);
    throw error;
  }
} 