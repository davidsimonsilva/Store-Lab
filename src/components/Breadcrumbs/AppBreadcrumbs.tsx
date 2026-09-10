import React from 'react';
import { Breadcrumbs, Link, Typography, Box, SxProps, Theme } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  breadcrumbsContainerStyle,
  breadcrumbLinkStyle,
  breadcrumbCurrentStyle,
} from './AppBreadcrumbs.styles';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
  sx?: SxProps<Theme>;
}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({ items, sx }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box sx={[...(Array.isArray(breadcrumbsContainerStyle) ? breadcrumbsContainerStyle : [breadcrumbsContainerStyle]), ...(Array.isArray(sx) ? sx : [sx])]}>
      <Breadcrumbs
        separator={<ChevronRight size={14} color="#94a3b8" />}
        aria-label="breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast || (!item.to && !item.onClick)) {
            return (
              <Typography
                key={`${item.label}-${index}`}
                sx={breadcrumbCurrentStyle}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.icon}
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={`${item.label}-${index}`}
              href={item.to || '#'}
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) {
                  item.onClick();
                } else if (item.to) {
                  navigate(item.to);
                }
              }}
              sx={breadcrumbLinkStyle}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
