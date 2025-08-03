'use client';
import { useState, useEffect, useCallback } from 'react';
import { communitySupportService } from '@/lib/pocketbase';

type CommunitySupportItem = {
  id: string;
  user_address: string;
  user_name?: string;
  support_type: string;
  campaign_address?: string;
  campaign_name?: string;
  amount?: string;
  tier_name?: string;
  message?: string;
  created: string;
};

type RecentCommunitySupportProps = {
  limit?: number;
  refreshTrigger?: number;
};

export const RecentCommunitySupport = ({ limit = 5, refreshTrigger }: RecentCommunitySupportProps) => {
  const [supportItems, setSupportItems] = useState<CommunitySupportItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCommunitySupportData = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = await communitySupportService.getRecent(limit);
      // Transform PocketBase records to our expected format
      const transformedItems: CommunitySupportItem[] = items.map((item: any) => ({
        id: item.id,
        user_address: item.user_address,
        user_name: item.user_name,
        support_type: item.support_type,
        campaign_address: item.campaign_address,
        campaign_name: item.campaign_name,
        amount: item.amount,
        tier_name: item.tier_name,
        message: item.message,
        created: item.created
      }));
      setSupportItems(transformedItems);
    } catch (error) {
      console.error('Error fetching community support:', error);
      setSupportItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchCommunitySupportData();
  }, [fetchCommunitySupportData, refreshTrigger]);

  const formatAddress = (address: string) => {
    if (!address) return 'Anonymous';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Recently';
    }
  };

  const getSupportTypeLabel = (type: string) => {
    switch (type) {
      case 'campaign_funding':
        return 'Supporter';
      case 'tier_purchase':
        return 'Tier Backer';
      case 'campaign_creation':
        return 'Creator';
      case 'campaign_share':
        return 'Promoter';
      default:
        return 'Supporter';
    }
  };

  const getSupportTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign_funding':
        return '💰';
      case 'tier_purchase':
        return '🎯';
      case 'campaign_creation':
        return '🚀';
      case 'campaign_share':
        return '📢';
      default:
        return '❤️';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
          🌟 Recent Community Support
        </h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
        🌟 Recent Community Support
      </h3>
      
      {supportItems.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400">No recent community support yet.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Be the first to support a campaign!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {supportItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                  {getSupportTypeIcon(item.support_type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.user_name || formatAddress(item.user_address)}
                    </span>
                    <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                      {getSupportTypeLabel(item.support_type)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {item.support_type === 'campaign_funding' && item.amount && (
                      <span>${item.amount} • </span>
                    )}
                    {item.tier_name && (
                      <span>{item.tier_name} • </span>
                    )}
                    {item.campaign_name && (
                      <span className="text-purple-600 dark:text-purple-400">{item.campaign_name}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button 
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                  onClick={() => {
                    if (item.campaign_address) {
                      window.open(`/campaign/${item.campaign_address}`, '_blank');
                    }
                  }}
                >
                  View
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(item.created)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <button 
          onClick={fetchCommunitySupportData}
          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};
