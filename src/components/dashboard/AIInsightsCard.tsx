'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIInsight } from '@/types';
import { Brain, Lightbulb, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

interface AIInsightsCardProps {
  insight: AIInsight;
}

export default function AIInsightsCard({ insight }: AIInsightsCardProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'recommendation':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      default:
        return <Brain className="h-5 w-5 text-green-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'recommendation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getInsightIcon(insight.type)}
          🤖 AI Financial Insight
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Personalized advice based on your spending patterns</span>
          <Badge className={getInsightColor(insight.type)} variant="secondary">
            {insight.type}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800 leading-relaxed">{insight.message}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Category Focus:</span> {insight.category}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(insight.generatedAt).toLocaleDateString()}
          </div>
        </div>

        {insight.recommendedBlogs && insight.recommendedBlogs.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Recommended Reading</span>
            </div>
            <div className="space-y-2">
              {insight.recommendedBlogs.map((blogUrl, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800 justify-start h-auto p-2"
                  onClick={() => window.open(blogUrl, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Financial Article {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Get More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
