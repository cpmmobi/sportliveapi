export interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQCategory {
  id: string
  name: string
  description: string
  icon: string
  itemCount: number
}

export interface FAQSearchParams {
  category?: string
  search?: string
}