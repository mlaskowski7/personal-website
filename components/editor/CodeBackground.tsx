import React from "react";

// Faint Go source rendered behind the editor content so the workspace
// reads like a code editor rather than a blank grid.
const GO_SOURCE = `package portfolio

import (
	"context"
	"fmt"
	"time"
)

type Engineer struct {
	Name     string
	Role     string
	Location string
	Since    time.Time
	Stack    []string
}

func NewEngineer() *Engineer {
	return &Engineer{
		Name:     "Mateusz Laskowski",
		Role:     "Software Engineer",
		Location: "Warsaw, Poland",
		Stack:    []string{"Go", "C#", ".NET", "AWS", "Terraform"},
	}
}

func (e *Engineer) Ship(ctx context.Context, feature string) error {
	if feature == "" {
		return fmt.Errorf("nothing to ship")
	}
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
		fmt.Printf("shipping %s...\\n", feature)
		return nil
	}
}

func main() {
	me := NewEngineer()
	ctx := context.Background()
	for _, f := range []string{"backend", "cloud", "ai"} {
		if err := me.Ship(ctx, f); err != nil {
			panic(err)
		}
	}
}
`;

const CodeBackground = () => {
  const lines = (GO_SOURCE + "\n" + GO_SOURCE).split("\n");
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <pre className="whitespace-pre p-6 text-[12px] leading-6 text-ed-muted/[0.10] sm:p-10 sm:text-[13px]">
        {lines.map((line, i) => (
          <span key={i} className="block">
            <span className="mr-4 inline-block w-6 text-right text-ed-muted/[0.06]">
              {(i % (GO_SOURCE.split("\n").length - 1)) + 1}
            </span>
            {line}
          </span>
        ))}
      </pre>
    </div>
  );
};

export default CodeBackground;
