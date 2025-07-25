import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isLeaksOpen, setIsLeaksOpen] = useState(false);
  const [isCrawlersOpen, setCrawlersOpen] = useState(false);
  const [isObjectsOpen, setObjectsOpen] = useState(false);
  const [isServerOpen, setServerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const tagsRef = useRef(null);
  const leaksRef = useRef(null);
  const crawlersRef = useRef(null);
  const objectsRef = useRef(null);
  const serverRef = useRef(null);

  const tagsDropdownData = [
    {
      title: "Tags Search",
      items: [
        "Search Items",
        "Search Messages",
        "Search Images",
        "Search Ocrs",
        "Search Domains",
        "Search Decoded Items",
        "Search Screenshots",
      ],
    },
    {
      title: "Tags Management",
      items: ["Search Items", "Search Messages", "Search Images", "Search Ocrs", "Search Screenshots"],
    },
    {
      title: "Tags Export",
      items: [
        "Search Items",
        "Search Messages",
        "Search Images",
        "Search Ocrs",
        "Search Domains",
        "Search Decoded Items",
        "Search Screenshots",
      ],
    },
    {
      title: "Tags Quick Search",
      items: ["Search Items", "Search Messages", "Search Screenshots"],
    },
  ];

  // Define styles for light and dark themes
  const themes = {
    light: {
      header: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#e5e7eb',
        color: '#111827'
      },
      logo: {
        color: '#111827'
      },
      navLink: {
        color: '#374151',
        hoverColor: '#111827'
      },
      dropdown: {
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      },
      dropdownTitle: {
        color: '#111827'
      },
      dropdownItem: {
        color: '#6b7280',
        hoverColor: '#111827'
      },
      dropdownHover: {
        backgroundColor: '#f3f4f6'
      },
      searchInput: {
        backgroundColor: '#f3f4f6',
        borderColor: '#e5e7eb',
        color: '#111827',
        placeholderColor: '#6b7280'
      },
      searchIcon: {
        color: '#9ca3af'
      },
      themeButton: {
        color: '#6b7280',
        hoverColor: '#374151'
      }
    },
    dark: {
      header: {
        backgroundColor: '#111827',
        borderBottomColor: '#374151',
        color: '#f9fafb'
      },
      logo: {
        color: '#f9fafb'
      },
      navLink: {
        color: '#d1d5db',
        hoverColor: '#f9fafb'
      },
      dropdown: {
        backgroundColor: '#1f2937',
        borderColor: '#374151',
        shadowColor: 'rgba(0, 0, 0, 0.3)'
      },
      dropdownTitle: {
        color: '#f9fafb'
      },
      dropdownItem: {
        color: '#9ca3af',
        hoverColor: '#f9fafb'
      },
      dropdownHover: {
        backgroundColor: '#374151'
      },
      searchInput: {
        backgroundColor: '#374151',
        borderColor: '#4b5563',
        color: '#f9fafb',
        placeholderColor: '#9ca3af'
      },
      searchIcon: {
        color: '#9ca3af'
      },
      themeButton: {
        color: '#9ca3af',
        hoverColor: '#d1d5db'
      }
    }
  };

  const currentTheme = isDark ? themes.dark : themes.light;

  // Icons as SVG components
  const ChevronDown = ({ style }) => (
    <svg style={style} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const Sun = ({ style }) => (
    <svg style={style} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const Moon = ({ style }) => (
    <svg style={style} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  const LogOut = ({ style }) => (
    <svg style={style} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );

  const Search = ({ style }) => (
    <svg style={style} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const X = ({ style }) => (
    <svg style={style} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Initialize theme on component mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
      setIsDark(shouldBeDark);
    } catch (error) {
      console.log('Theme initialization error:', error);
      setIsDark(false);
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      console.log('Switched to', newTheme ? 'dark' : 'light', 'mode');
    } catch (error) {
      console.log('Theme toggle error:', error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagsRef.current && !tagsRef.current.contains(event.target)) {
        setIsTagsOpen(false);
      }
      if (leaksRef.current && !leaksRef.current.contains(event.target)) {
        setIsLeaksOpen(false);
      }
      if (crawlersRef.current && !crawlersRef.current.contains(event.target)) {
        setCrawlersOpen(false);
      }
      if (objectsRef.current && !objectsRef.current.contains(event.target)) {
        setObjectsOpen(false);
      }
      if (serverRef.current && !serverRef.current.contains(event.target)) {
        setServerOpen(false);
      }

      const searchContainer = event.target;
      if (!searchContainer.closest(".relative")) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = [];

    tagsDropdownData.forEach((section) => {
      const matchingItems = section.items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingItems.length > 0) {
        results.push({
          title: section.title,
          items: matchingItems,
        });
      }
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <header 
      style={{
        backgroundColor: currentTheme.header.backgroundColor,
        borderBottom: `1px solid ${currentTheme.header.borderBottomColor}`,
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <div style={{ padding: '20px 40px'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
          {/* Logo with added padding */}
          <div style={{ flexShrink: 0, paddingRight: '48px' }}>
            <span 
              style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: currentTheme.logo.color,
                transition: 'color 0.2s ease-in-out'
              }}
            >
              INPHEX
            </span>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a
              href="#"
              style={{ 
                color: currentTheme.navLink.color, 
                fontSize: '14px', 
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.target.style.color = currentTheme.navLink.hoverColor}
              onMouseLeave={(e) => e.target.style.color = currentTheme.navLink.color}
            >
              Home
            </a>
            <a
              href="#"
              style={{ 
                color: currentTheme.navLink.color, 
                fontSize: '14px', 
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.target.style.color = currentTheme.navLink.hoverColor}
              onMouseLeave={(e) => e.target.style.color = currentTheme.navLink.color}
            >
              Submit
            </a>

            {/* Tags Dropdown */}
            <div style={{ position: 'relative' }} ref={tagsRef}>
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: currentTheme.navLink.color, 
                  fontSize: '14px', 
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => e.target.style.color = currentTheme.navLink.hoverColor}
                onMouseLeave={(e) => e.target.style.color = currentTheme.navLink.color}
              >
                Tags
                <span style={{ marginLeft: '4px' }}>
                  <ChevronDown style={{ color: 'currentColor' }} />
                </span>
              </button>

              {isTagsOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    width: '800px',
                    backgroundColor: currentTheme.dropdown.backgroundColor,
                    border: `1px solid ${currentTheme.dropdown.borderColor}`,
                    borderRadius: '8px',
                    boxShadow: `0 10px 15px -3px ${currentTheme.dropdown.shadowColor}`,
                    zIndex: 50,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, minHeight: '280px' }}>
                    {tagsDropdownData.map((section, index) => (
                      <div
                        key={section.title}
                        style={{
                          padding: '12px',
                          borderRight: index < 3 ? `1px solid ${currentTheme.dropdown.borderColor}` : 'none',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ width: '6px', height: '6px', backgroundColor: '#22d3ee', borderRadius: '50%', marginRight: '6px', flexShrink: 0 }}></div>
                          <h3 style={{ 
                            fontSize: '11px', 
                            fontWeight: '500', 
                            color: currentTheme.dropdownTitle.color, 
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {section.title}
                          </h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                          {section.items.map((item) => (
                            <li key={item} style={{ marginBottom: '6px' }}>
                              <a
                                href="#"
                                style={{ 
                                  display: 'block', 
                                  fontSize: '11px', 
                                  color: currentTheme.dropdownItem.color,
                                  textDecoration: 'none',
                                  transition: 'color 0.2s ease-in-out',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                                onMouseEnter={(e) => e.target.style.color = currentTheme.dropdownItem.hoverColor}
                                onMouseLeave={(e) => e.target.style.color = currentTheme.dropdownItem.color}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Dropdowns */}
            {[
              { name: 'Leaks Hunter', ref: leaksRef, isOpen: isLeaksOpen, setOpen: setIsLeaksOpen },
              { name: 'Crawlers', ref: crawlersRef, isOpen: isCrawlersOpen, setOpen: setCrawlersOpen },
              { name: 'Objects', ref: objectsRef, isOpen: isObjectsOpen, setOpen: setObjectsOpen },
              { name: 'Server Management', ref: serverRef, isOpen: isServerOpen, setOpen: setServerOpen }
            ].map((item) => (
              <div key={item.name} style={{ position: 'relative' }} ref={item.ref}>
                <button
                  onClick={() => item.setOpen(!item.isOpen)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: currentTheme.navLink.color, 
                    fontSize: '14px', 
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease-in-out',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.color = currentTheme.navLink.hoverColor}
                  onMouseLeave={(e) => e.target.style.color = currentTheme.navLink.color}
                >
                  {item.name}
                  <span style={{ marginLeft: '4px' }}>
                    <ChevronDown style={{ color: 'currentColor' }} />
                  </span>
                </button>

                {item.isOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '4px',
                      width: '192px',
                      backgroundColor: currentTheme.dropdown.backgroundColor,
                      border: `1px solid ${currentTheme.dropdown.borderColor}`,
                      borderRadius: '8px',
                      boxShadow: `0 10px 15px -3px ${currentTheme.dropdown.shadowColor}`,
                      zIndex: 50,
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <div style={{ padding: '8px' }}>
                      <a
                        href="#"
                        style={{ 
                          display: 'block', 
                          padding: '12px', 
                          fontSize: '14px', 
                          color: currentTheme.dropdownItem.color,
                          textDecoration: 'none',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = currentTheme.dropdownItem.hoverColor;
                          e.target.style.backgroundColor = currentTheme.dropdownHover.backgroundColor;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = currentTheme.dropdownItem.color;
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        {item.name === 'Leaks Hunter' ? 'Search Leaks' : 
                         item.name === 'Crawlers' ? 'Web Crawler' :
                         item.name === 'Objects' ? 'View Objects' : 'Server Status'}
                      </a>
                      <a
                        href="#"
                        style={{ 
                          display: 'block', 
                          padding: '12px', 
                          fontSize: '14px', 
                          color: currentTheme.dropdownItem.color,
                          textDecoration: 'none',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = currentTheme.dropdownItem.hoverColor;
                          e.target.style.backgroundColor = currentTheme.dropdownHover.backgroundColor;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = currentTheme.dropdownItem.color;
                          e.target.style.backgroundColor = 'transparent';
                        }}
                      >
                        {item.name === 'Leaks Hunter' ? 'Leak Reports' : 
                         item.name === 'Crawlers' ? 'API Crawler' :
                         item.name === 'Objects' ? 'Manage Objects' : 'Configuration'}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Search Field */}
            
          </nav>

          {/* Right side buttons */}

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                  <Search style={{ color: currentTheme.searchIcon.color }} />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  style={{
                    width: '200px',
                    height: '32px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    fontSize: '14px',
                    backgroundColor: currentTheme.searchInput.backgroundColor,
                    border: `1px solid ${currentTheme.searchInput.borderColor}`,
                    borderRadius: '4px',
                    outline: 'none',
                    color: currentTheme.searchInput.color,
                    transition: 'all 0.2s ease-in-out',
                    boxSizing: 'border-box'
                  }}
                //   onFocus={(e) => {
                //     e.target.style.borderColor = '#3b82f6';
                //     e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                //   }}
                  onBlur={(e) => {
                    e.target.style.borderColor = currentTheme.searchInput.borderColor;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: currentTheme.searchIcon.color,
                      transition: 'color 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => e.target.style.color = currentTheme.navLink.hoverColor}
                    onMouseLeave={(e) => e.target.style.color = currentTheme.searchIcon.color}
                  >
                    <X style={{ color: 'currentColor' }} />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearchFocused && searchQuery && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    width: '384px',
                    backgroundColor: currentTheme.dropdown.backgroundColor,
                    border: `1px solid ${currentTheme.dropdown.borderColor}`,
                    borderRadius: '8px',
                    boxShadow: `0 10px 15px -3px ${currentTheme.dropdown.shadowColor}`,
                    zIndex: 50,
                    maxHeight: '384px',
                    overflowY: 'auto',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {searchResults.length > 0 ? (
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontSize: '12px', color: currentTheme.dropdownItem.color, marginBottom: '12px' }}>
                        Search results for "{searchQuery}"
                      </div>
                      {searchResults.map((section, index) => (
                        <div key={section.title} style={{ marginTop: index > 0 ? '16px' : '0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#22d3ee', borderRadius: '50%', marginRight: '8px' }}></div>
                            <h3 style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.dropdownTitle.color, margin: 0 }}>
                              {section.title}
                            </h3>
                          </div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginLeft: '16px' }}>
                            {section.items.map((item) => (
                              <li key={item} style={{ marginBottom: '4px' }}>
                                <a
                                  href="#"
                                  onClick={() => clearSearch()}
                                  style={{ 
                                    display: 'block', 
                                    fontSize: '12px', 
                                    color: currentTheme.dropdownItem.color,
                                    textDecoration: 'none',
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                    transition: 'color 0.2s ease-in-out'
                                  }}
                                  onMouseEnter={(e) => e.target.style.color = currentTheme.dropdownItem.hoverColor}
                                  onMouseLeave={(e) => e.target.style.color = currentTheme.dropdownItem.color}
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: currentTheme.dropdownItem.color }}>
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Theme toggle */}
            
            <button
              onClick={toggleTheme}
              style={{
                padding: '8px',
                color: currentTheme.themeButton.color,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.target.style.color = currentTheme.themeButton.hoverColor}
              onMouseLeave={(e) => e.target.style.color = currentTheme.themeButton.color}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              type="button"
            >
              {isDark ? <Sun style={{ color: 'currentColor' }} /> : <Moon style={{ color: 'currentColor' }} />}
            </button>

            {/* Logout button */}
            <button 
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                height: '32px',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              <span style={{ marginRight: '4px' }}>
                <LogOut style={{ color: 'currentColor' }} />
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;