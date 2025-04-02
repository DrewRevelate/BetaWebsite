#!/bin/bash

# Docker helper script for Revelate Operations Next.js Website
# This script simplifies common Docker commands for both development and production

# Color codes for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display help information
show_help() {
  echo -e "${BLUE}Revelate Operations Docker Helper${NC}"
  echo -e "Usage: ./docker.sh [command]"
  echo
  echo -e "Commands:"
  echo -e "  ${GREEN}dev${NC}           - Start development environment with hot reloading"
  echo -e "  ${GREEN}dev:build${NC}     - Rebuild development environment"
  echo -e "  ${GREEN}dev:down${NC}      - Stop development environment"
  echo -e "  ${GREEN}prod${NC}          - Start production environment"
  echo -e "  ${GREEN}prod:build${NC}    - Rebuild production environment"
  echo -e "  ${GREEN}prod:down${NC}     - Stop production environment"
  echo -e "  ${GREEN}logs [service]${NC} - View logs (app, db, or all if not specified)"
  echo -e "  ${GREEN}prune${NC}         - Clean unused Docker resources"
  echo -e "  ${GREEN}reset-db${NC}      - Reset development database"
  echo -e "  ${GREEN}shell${NC}         - Open a shell in the running app container"
  echo -e "  ${GREEN}help${NC}          - Show this help message"
  echo
  echo -e "Example: ./docker.sh dev"
}

# Check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
  fi

  if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed or not in path.${NC}"
    exit 1
  fi
}

# Make the script executable if it isn't already
chmod +x "$0"

# Main command handler
case "$1" in
  dev)
    check_docker
    echo -e "${GREEN}Starting development environment...${NC}"
    docker compose -f docker-compose.dev.yml up
    ;;
    
  dev:build)
    check_docker
    echo -e "${GREEN}Rebuilding development environment...${NC}"
    docker compose -f docker-compose.dev.yml build --no-cache
    ;;
    
  dev:down)
    check_docker
    echo -e "${GREEN}Stopping development environment...${NC}"
    docker compose -f docker-compose.dev.yml down
    ;;
    
  prod)
    check_docker
    echo -e "${GREEN}Starting production environment...${NC}"
    docker compose up -d
    echo -e "${GREEN}Production environment started. Access at http://localhost:3000${NC}"
    ;;
    
  prod:build)
    check_docker
    echo -e "${GREEN}Rebuilding production environment...${NC}"
    docker compose build --no-cache
    ;;
    
  prod:down)
    check_docker
    echo -e "${GREEN}Stopping production environment...${NC}"
    docker compose down
    ;;
    
  logs)
    check_docker
    if [ -z "$2" ]; then
      echo -e "${GREEN}Showing all logs...${NC}"
      docker compose logs -f
    else
      echo -e "${GREEN}Showing logs for $2...${NC}"
      docker compose logs -f "$2"
    fi
    ;;
    
  prune)
    check_docker
    echo -e "${YELLOW}This will remove all unused Docker resources.${NC}"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${GREEN}Pruning Docker resources...${NC}"
      docker system prune -f
    fi
    ;;
    
  reset-db)
    check_docker
    echo -e "${YELLOW}This will delete all development database data.${NC}"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${GREEN}Resetting development database...${NC}"
      docker compose -f docker-compose.dev.yml down -v
      echo -e "${GREEN}Database reset. Restart with './docker.sh dev'${NC}"
    fi
    ;;
    
  shell)
    check_docker
    echo -e "${GREEN}Opening shell in app container...${NC}"
    container_id=$(docker compose ps -q app 2>/dev/null || docker compose -f docker-compose.dev.yml ps -q app 2>/dev/null)
    
    if [ -z "$container_id" ]; then
      echo -e "${RED}App container is not running. Start it first with 'dev' or 'prod' command.${NC}"
      exit 1
    fi
    
    docker exec -it "$container_id" /bin/bash || docker exec -it "$container_id" /bin/sh
    ;;
    
  help|*)
    show_help
    ;;
esac
